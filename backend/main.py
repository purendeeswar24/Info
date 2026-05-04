import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

# Restored Full RAG Imports (LangChain 0.3 Standard)
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Purendeeswar Portfolio API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# The Full Context Matrix (Resume Data)
RESUME_TEXT = """
Purendeeswar Reddy Mure
Email: purendeeswar444@gmail.com | Phone: +91 6300263868
LinkedIn: linkedin.com/in/purendeeswar-reddy5469 | GitHub: github.com/purendeeswar24

PROFESSIONAL SUMMARY:
AI/ML Engineer and Associate Technical Team Lead specializing in production-grade cloud-native AI systems, agentic platforms, and LLM-based applications. Expert in Google Cloud Platform (GCP).

TECHNICAL SKILLS:
Cloud: GCP, Vertex AI, Cloud Run, Cloud SQL, BigQuery.
AI/ML: Multi-Agent Systems (MAS), RAG, LangChain, FAISS, Prompt Engineering.
Backend: FastAPI, Python, RESTful APIs, Uvicorn, OAuth 2.0.
Integrations: Composio, Salesforce, HubSpot, ClickUp, Google Workspace APIs.

EXPERIENCE:
AI/ML Engineer — D3V Technologies (June 2025 – Present): Lead for 'Agent Zone' platform.
Technical Team Lead — Populus: RAG-based systems for construction sector.
AI & ML Intern — VRT Management Groups: NLP automation and attendance systems.

ACHIEVEMENTS:
- Pratibha Award 2025 for AI Research.
- 1st Place KSRM ML/AI Competition 2023.
- B.Tech CSE (8.6 CGPA) from KMM Institute.
"""

def initialize_rag():
    if not GOOGLE_API_KEY:
        print("❌ GOOGLE_API_KEY missing")
        return None
    try:
        print("🛠️ Initializing AURA RAG Matrix...")
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        texts = text_splitter.split_text(RESUME_TEXT)
        
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GOOGLE_API_KEY)
        vector_store = FAISS.from_texts(texts, embeddings)
        
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.7, google_api_key=GOOGLE_API_KEY)
        
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

# Lazy Loading for stability
_rag_chain = None

def get_rag_chain():
    global _rag_chain
    if _rag_chain is None:
        _rag_chain = initialize_rag()
    return _rag_chain

class ChatRequest(BaseModel):
    message: str

@app.api_route("/", methods=["GET", "HEAD"])
async def root():
    return {"status": "online", "agent": "AURA v3.1", "matrix": "Restored"}

@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    chain = get_rag_chain()
    if chain:
        try:
            response = chain.invoke({"input": request.message})
            return {"response": response["answer"]}
        except Exception as e:
            return {"response": "AURA neural link unstable. Please retry."}
    return {"response": "AURA offline. Service initialization pending."}

@app.post("/api/rag-process")
async def rag_process():
    return {"status": "success", "simulated_result": "Neural synthesis complete."}

if __name__ == "__main__":
    # Get port from Render or default to 8000
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 AURA starting on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
