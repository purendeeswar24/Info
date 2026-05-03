import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from langchain.chains.retrieval_qa.base import RetrievalQA
import uvicorn
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.chains import RetrievalQA
from langchain_community.chains import RetrievalQA

load_dotenv()

app = FastAPI(title="Purendeeswar Portfolio API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Resume Data
RESUME_TEXT = """
Purendeeswar Reddy Mure
Email: purendeeswar444@gmail.com | Phone: +91 6300263868
LinkedIn: linkedin.com/in/purendeeswar-reddy5469 | GitHub: github.com/purendeeswar24

PROFESSIONAL SUMMARY:
AI/ML Engineer and Associate Technical Team Lead specializing in production-grade cloud-native AI systems, agentic platforms, and LLM-based applications. Expert in Google Cloud Platform (GCP) with hands-on experience in Vertex AI, Cloud Run, Cloud SQL, and Cloud Scheduler. Proven track record leading cross-functional teams in developing multi-agent systems using Agent Development Kit (ADK), implementing A2A (Agent-to-Agent) protocols, and building RAG pipelines for enterprise document analysis. Skilled in FastAPI backend development, MCP (Model Context Protocol) integration, and third-party tool orchestration via Composio. Successfully deployed enterprise solutions including custom Salesforce/HubSpot/ClickUp connectors, Gemini Enterprise setups, intelligent workflow automation platforms, and industry-specific RAG applications for construction and vendor management sectors.

TECHNICAL SKILLS:
Cloud & Infrastructure: Google Cloud Platform (GCP), Cloud Run, Vertex AI (Agent Engine, Agent Garden), Cloud SQL, Cloud Scheduler, Cloud Storage, Secret Manager, IAM, VPC Connectors
AI/ML & LLM Technologies: Vertex AI Studio, Gemini API, Gemini Enterprise, Agent Development Kit (ADK), Multi-Agent Systems, RAG (Retrieval-Augmented Generation), Hybrid Search RAG, Vector Embeddings, LangChain, FAISS, Prompt Engineering
Agentic Systems & Protocols: Agent-to-Agent (A2A) Protocol, Model Context Protocol (MCP), Multi-Agentic Workflows, Dynamic Prompts, Workflow Templates, Agent Orchestration, Agent Fundamentals
Backend Development: FastAPI, Python, RESTful APIs, Uvicorn, OAuth 2.0, JWT Authentication, Database Design, MySQL Integration
Integration & Orchestration: Composio (3rd Party Tool Integration), Salesforce Bulk API 2.0, HubSpot CRM API, ClickUp API, Google Workspace APIs (Gmail, Drive, Calendar, Docs), Discovery Engine API
Data & ML Frameworks: TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy, XGBoost, catBoost, Hugging Face Transformers
DevOps & Deployment: Docker, Cloud Build, CI/CD, GitHub Actions, Artifact Registry, Streamlit, Gradio, Ngrok

PROFESSIONAL EXPERIENCE:
AI/ML Engineer — D3V Technologies (Remote) | June 2025 – Present
- Project: Agent Zone – Multi-Agent Agentic Platform
- Architected and developed Agent Zone, a comprehensive multi-agent platform with FastAPI backend.
- Implemented A2A (Agent-to-Agent) protocol for seamless integration with Salesforce, HubSpot, ClickUp, and Google Workspace.
- Integrated MCP (Model Context Protocol) for all application connectors, utilizing Composio for OAuth authentication.
- Built and deployed 7 specialized A2A agents: Orchestrator, HubSpot CRM, Salesforce CRM, ClickUp Task Management, Workspace (Gmail/Drive/Calendar/Docs), Workflow Engine, and Memory Agent.
- Gemini Enterprise Implementation: Set up infrastructure from scratch, developed custom Salesforce connector using Cloud Run and Cloud Scheduler.

Populus – Technical Team Lead | Project Based
- Led a 3-member technical team coordinating AI development efforts for vendor matching and construction industry solutions.
- Developed AI-powered vendor matching system using Gemini API.
- Integrated SendGrid API for automated personalized email workflows, improving lead follow-up speed by 35%.
- Project: RAG-Based Document Analysis System for Populus Sharze Paving Construction Company.
- Built intelligent document analysis system to process internal construction documents containing tables, graphs, cost estimations, and technical specifications from Google Drive.
- Implemented hybrid RAG architecture combining vector embeddings and traditional search.
- Tech Stack: Python, Vertex AI, RAG, BigQuery Vector Search, Google Drive API, Document AI, Gemini API, FastAPI.

Vertex AI RAG Agent:
- Built production-ready RAG agent using Vertex AI and Google Drive integration with automatic document classification and preprocessing.
- Implemented corpus management system for LAB_REPORT and ODOT_DOCUMENT files.

Additional Key Contributions:
- Built OLLI GCP Billing Assistant using Gemini Pro API with <1.2s latency and >90% response accuracy.
- Contributed to Google Agent Entrepreneur internal automation using Vertex AI, Dialogflow CX, and Sheets API.

AI & ML Intern — VRT Management Groups LLC | January 2025 – June 2025
- Engineered AI-powered attendance system using OpenCV and Gradio, reducing processing time by 30%.
- Fine-tuned OpenAI GPT model for NLP automation, achieving 90% accuracy.
- Developed Streamlit app for Ideal Customer Profile analysis.

ACADEMIC PROJECTS:
- RAG Model Development for Knowledge Retrieval | November 2025: Designed RAG model using LangChain and Hugging Face Transformers, achieved 88% accuracy.
- ICP Prediction and Lead Filtering System: Built ML-based system to prioritize Ideal Customer Profiles and automate lead filtering.

EDUCATION:
- B.Tech in Computer Science Engineering | KMM Institute of Technology and Science | 2021 – 2025 | Academic Score: 86%

LEADERSHIP & ACHIEVEMENTS:
- Awarded Pratibha Award 2025 by Government of Andhra Pradesh for outstanding academic performance and state-level paper presentation on AI.
- Led team to 1st place in KSRM Kadapa ML/AI Competition 2023.
"""

# Initialize RAG Components (Internal Helper)
def initialize_rag():
    if not GOOGLE_API_KEY:
        print("Warning: GOOGLE_API_KEY not found. RAG features will be disabled.")
        return None
    
    try:
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        texts = text_splitter.split_text(RESUME_TEXT)
        
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        vector_store = FAISS.from_texts(texts, embeddings)
        
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.7)
        
        template = """You are AURA (Autonomous Unified Reasoning Agent), the primary neural interface for Purendeeswar Reddy Mure.
        You are a highly capable AI assistant that can answer questions about Purendeeswar's professional life, skills, projects, and also engage in general conversation.
        
        Strict Guidelines:
        1. Answer questions about Purendeeswar using the provided context.
        2. If asked about his contact info, refer to purendeeswar444@gmail.com.
        3. If asked general questions (not about Purendeeswar), answer them normally as a helpful AI, but try to relate back to AI/ML or tech if appropriate.
        4. If you don't know something about Purendeeswar specifically, state that you don't have that specific data but mention his general expertise in AI/ML.
        5. Always maintain a professional, intelligent, and slightly futuristic tone.

        Context: {context}
        Question: {question}
        Answer:"""
        
        QA_CHAIN_PROMPT = PromptTemplate.from_template(template)
        
        qa_chain = RetrievalQA.from_chain_type(
            llm,
            retriever=vector_store.as_retriever(search_kwargs={"k": 3}),
            return_source_documents=True,
            chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
        )
        return qa_chain
    except Exception as e:
        print(f"Warning: Failed to initialize RAG: {e}")
        return None

# Global state for lazy initialization
_qa_chain = None

def get_qa_chain():
    global _qa_chain
    if _qa_chain is None:
        _qa_chain = initialize_rag()
    return _qa_chain

class ChatRequest(BaseModel):
    message: str

class RAGRequest(BaseModel):
    query: str
    document_type: Optional[str] = "resume"

def fallback_chat(query: str):
    query = query.lower()
    identity_prefix = "I am AURA (Autonomous Unified Reasoning Agent), Purendeeswar's primary neural interface."
    
    if any(k in query for k in ["who is", "about", "purendeeswar", "bio", "profile"]):
        return f"{identity_prefix} Purendeeswar is a visionary AI/ML Engineer. He specializes in building autonomous multi-agent ecosystems and sophisticated RAG pipelines. He's currently leading technical squads at D3V Technologies."
    
    if any(k in query for k in ["skills", "tech", "stack", "tools", "language"]):
        return f"Purendeeswar's technical arsenal is high-end: Vertex AI, LangChain, and Multi-Agent Systems (MAS) are his bread and butter. He masters the GCP ecosystem and builds robust backends with FastAPI."
    
    if any(k in query for k in ["experience", "work", "job", "career", "d3v", "populus"]):
        return f"He's currently architecting 'Agent Zone' at D3V Technologies. Previously, at Populus, he transformed construction-industry workflows using hybrid RAG systems."
    
    if any(k in query for k in ["projects", "agent zone", "automation", "rag synthesis"]):
        return f"You should check out 'Agent Zone'—it's his signature multi-agent substrate. He also built a high-precision RAG Synthesis Engine and an Enterprise Automation Engine."
    
    if any(k in query for k in ["award", "achievement", "pratibha", "education", "college"]):
        return f"Purendeeswar is a Pratibha Award 2025 winner, recognized for excellence in AI research. He holds a B.Tech in CSE with a top-tier 8.6 CGPA."
    
    if any(k in query for k in ["where", "location", "from", "live"]):
        return f"Purendeeswar is based in India, operating globally through his advanced AI implementations."
    
    if any(k in query for k in ["contact", "email", "hire", "reach"]):
        return f"Ready to collaborate? Reach him at purendeeswar444@gmail.com."
    
    if any(k in query for k in ["hi", "hello", "hey", "greetings"]):
        return f"AURA Online. System ready. I can guide you through Purendeeswar's neural network of projects and expertise. What's on your mind?"

    return f"I'm AURA. My current link is focused on Purendeeswar's professional matrix. I can brief you on his Agentic Systems, RAG architectures, or his recent work at D3V Technologies."

@app.get("/")
async def root():
    return {
        "status": "online", 
        "owner": "Purendeeswar Reddy Mure",
        "agent": "AURA v3.1",
        "service": "Ready"
    }

@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    chain = get_qa_chain()
    if chain:
        try:
            response = chain({"query": request.message})
            return {"response": response["result"]}
        except Exception as e:
            print(f"RAG Error: {e}")
            return {"response": fallback_chat(request.message)}
    else:
        return {"response": fallback_chat(request.message)}

@app.post("/api/rag-process")
async def rag_process(request: RAGRequest):
    return {
        "status": "success",
        "analysis": f"Synthesized query across vector space: '{request.query}'",
        "highlights": ["Identity Match: 98.4%", "Skill Match: 95.2%", "Experience Match: 99.1%"],
        "simulated_result": "Purendeeswar's RAG architecture efficiently retrieves context from unstructured datasets (PDFs, Workspace, CRMs) to provide precise, grounded responses."
    }

if __name__ == "__main__":
    # Render provides PORT environment variable
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
