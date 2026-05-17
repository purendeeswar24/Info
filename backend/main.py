import os
import json
import asyncio
import sys
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
from dotenv import load_dotenv

# Add agents directory to path for imports
sys.path.insert(0, str(Path(__file__).parent / "agents"))

# ADK Imports - Simplified
from google.genai import types as genai_types

# Import the portfolio agent
from chat_agent.agent import portfolio_agent

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

# Simple in-memory RAG store (chunks + keyword search)
class SimpleRAGStore:
    def __init__(self):
        self.chunks = []
        self._initialize()
    
    def _initialize(self):
        """Initialize RAG store with resume chunks."""
        try:
            print("🛠️ Initializing PREDAI RAG Matrix...")
            # Simple chunking by sentences/sections
            chunk_size = 500
            self.chunks = [
                RESUME_TEXT[i:i+chunk_size] 
                for i in range(0, len(RESUME_TEXT), chunk_size)
                if RESUME_TEXT[i:i+chunk_size].strip()
            ]
            print(f"✅ PREDAI RAG Matrix Online. ({len(self.chunks)} chunks)")
        except Exception as e:
            print(f"❌ RAG Error: {e}")
    
    def search(self, query: str, limit: int = 3) -> str:
        """Simple keyword-based search in chunks."""
        query_lower = query.lower()
        query_words = set(query_lower.split())
        
        # Score chunks based on keyword matches
        scored_chunks = []
        for chunk in self.chunks:
            chunk_lower = chunk.lower()
            score = sum(1 for word in query_words if word in chunk_lower)
            if score > 0:
                scored_chunks.append((score, chunk))
        
        # Sort by score and return top matches
        scored_chunks.sort(reverse=True, key=lambda x: x[0])
        matching_chunks = [chunk for _, chunk in scored_chunks[:limit]]
        
        return "\n---\n".join(matching_chunks) if matching_chunks else "No relevant context found in resume."

# Global RAG store
rag_store = SimpleRAGStore()

# ========================
# AGENT SETUP
# ========================

# Use the portfolio agent from chat_agent module
# portfolio_agent is already imported above and ready to use

# ========================
# PYDANTIC MODELS
# ========================

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    retrieved_context: Optional[List[str]] = None
    query: str = ""

# ========================
# RUNNER FOR AGENT EXECUTION
# ========================

def run_agent_sync(message: str) -> str:
    """Run agent synchronously and extract response."""
    try:
        # Use the portfolio agent to process the message
        response = portfolio_agent.process_message(message)
        return response
    
    except Exception as e:
        print(f"❌ Agent Error: {e}")
        import traceback
        traceback.print_exc()
        return f"PREDAI encountered an error: {str(e)}"

# ========================
# FASTAPI ENDPOINTS
# ========================

@app.api_route("/", methods=["GET", "HEAD"])
async def root():
    return {
        "status": "online", 
        "agent": "PREDAI (Professional Expert Data & AI) v1.0", 
        "framework": "Google Agent Development Kit + Ollama",
        "portfolio": "Purendeeswar Reddy Mure",
        "model": "neural-chat 3.8B",
        "endpoints": {
            "/api/chat": "Chat with PREDAI AI assistant",
            "/api/agent-info": "Get information about the agent",
            "/api/health": "Health check",
            "/api/rag-process": "RAG system status"
        }
    }

@app.get("/api/agent-info")
async def agent_info():
    """Get information about PREDAI agent and its capabilities."""
    return {
        "name": "PREDAI",
        "model": "Gemini Flash Latest",
        "framework": "Google ADK (Agent Development Kit)",
        "description": "Portfolio AI Assistant for Purendeeswar Reddy Mure",
        "capabilities": [
            "Answer questions about professional experience",
            "Discuss technical skills and expertise",
            "Provide project information and details",
            "Share contact and social media information",
            "Discuss awards and achievements",
            "General conversation and assistance"
        ],
        "tools": [
            "get_experience_summary",
            "get_technical_skills",
            "get_projects_info",
            "get_contact_info",
            "get_achievements"
        ],
        "version": "1.0.0"
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_adk_agent(request: ChatRequest):
    """
    Chat with PREDAI - Portfolio AI Assistant powered by RAG and Google ADK.
    This agent uses Purendeeswar's resume context to answer questions.
    Returns both the AI response and the retrieved context chunks.
    """
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    try:
        # Step 1: Retrieve relevant context from resume using RAG
        retrieved_text = rag_store.search(request.message, limit=3)
        
        # Parse retrieved chunks into list for frontend
        retrieved_chunks = [chunk.strip() for chunk in retrieved_text.split("---") if chunk.strip()]
        
        # Step 2: Run agent in thread pool to avoid blocking
        response = await asyncio.to_thread(run_agent_sync, request.message)
        
        # Step 3: Return response with retrieved context
        return ChatResponse(
            response=response,
            retrieved_context=retrieved_chunks,
            query=request.message
        )
    
    except Exception as e:
        print(f"❌ ADK Agent Error: {e}")
        import traceback
        traceback.print_exc()
        return ChatResponse(response="PREDAI is experiencing technical difficulties. Please try again.")

@app.post("/api/rag-process")
async def rag_process():
    """RAG processing endpoint."""
    return {
        "status": "success", 
        "message": "Neural synthesis complete.",
        "chunks": len(rag_store.chunks)
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "agent": "PREDAI",
        "rag_ready": len(rag_store.chunks) > 0
    }

# ========================
# MAIN
# ========================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 PREDAI (Google ADK) starting on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
