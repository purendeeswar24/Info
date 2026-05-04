import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

# Modern LangChain 0.3 Imports
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Purendeeswar Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
print(f"DEBUG: GOOGLE_API_KEY status: {'LOADED' if GOOGLE_API_KEY else 'MISSING'}")

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

def initialize_rag():
    if not GOOGLE_API_KEY:
        return None
    
    try:
        print("🛠️ Initializing AURA RAG Matrix (v0.3)...")
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        texts = text_splitter.split_text(RESUME_TEXT)
        
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=GOOGLE_API_KEY
        )
        vector_store = FAISS.from_texts(texts, embeddings)
        
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash", 
            temperature=0.7,
            google_api_key=GOOGLE_API_KEY
        )
        
        system_prompt = (
            "You are AURA (Autonomous Unified Reasoning Agent), the primary neural interface for Purendeeswar Reddy Mure. "
            "Use the following pieces of retrieved context to answer the user's question about Purendeeswar. "
            "If asked general questions, answer them normally as a helpful AI. "
            "Always maintain a professional and futuristic tone.\n\n"
            "{context}"
        )
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{input}"),
        ])
        
        question_answer_chain = create_stuff_documents_chain(llm, prompt)
        rag_chain = create_retrieval_chain(vector_store.as_retriever(), question_answer_chain)
        
        print("✅ AURA RAG Matrix Online.")
        return rag_chain
    except Exception as e:
        print(f"❌ RAG Error: {e}")
        return None

_rag_chain = None

def get_rag_chain():
    global _rag_chain
    if _rag_chain is None:
        _rag_chain = initialize_rag()
    return _rag_chain

class ChatRequest(BaseModel):
    message: str

class RAGRequest(BaseModel):
    query: str
    document_type: Optional[str] = "resume"

def fallback_chat(query: str):
    query = query.lower()
    identity_prefix = "I am AURA (Autonomous Unified Reasoning Agent), Purendeeswar's primary neural interface."
    if any(k in query for k in ["who is", "about", "purendeeswar"]):
        return f"{identity_prefix} Purendeeswar is a visionary AI/ML Engineer specializing in multi-agent ecosystems and RAG pipelines."
    return f"I'm AURA. My neural link is focused on Purendeeswar's professional matrix. How can I assist you?"

@app.get("/")
async def root():
    return {"status": "online", "owner": "Purendeeswar Reddy Mure", "agent": "AURA v3.1"}

@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    chain = get_rag_chain()
    if chain:
        try:
            response = chain.invoke({"input": request.message})
            return {"response": response["answer"]}
        except Exception as e:
            print(f"Invoke Error: {e}")
            return {"response": fallback_chat(request.message)}
    return {"response": fallback_chat(request.message)}

@app.post("/api/rag-process")
async def rag_process(request: RAGRequest):
    return {
        "status": "success",
        "simulated_result": "Purendeeswar's RAG architecture efficiently retrieves context from unstructured datasets to provide grounded responses."
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
