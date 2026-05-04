import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
import google.generativeai as genai
from dotenv import load_dotenv

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
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)
    print("✅ Gemini AI Configured.")
else:
    print("❌ Warning: GOOGLE_API_KEY not found.")

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

class ChatRequest(BaseModel):
    message: str

def get_aura_response(user_query: str):
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = f"""You are AURA (Autonomous Unified Reasoning Agent), the primary neural interface for Purendeeswar Reddy Mure.
        Your goal is to answer questions about Purendeeswar's professional profile using the context provided below.
        
        Purendeeswar's Professional Context:
        {RESUME_TEXT}
        
        Guidelines:
        1. Use the context to answer accurately.
        2. If asked about contact info, use purendeeswar444@gmail.com.
        3. For general questions, be helpful and professional.
        4. Maintain a futuristic, intelligent, and highly capable tone.
        
        User Query: {user_query}
        AURA Response:"""
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"AI Error: {e}")
        return "AURA neural link unstable. Please try again."

@app.get("/")
async def root():
    return {"status": "online", "owner": "Purendeeswar Reddy Mure", "agent": "AURA v3.1"}

@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    response = get_aura_response(request.message)
    return {"response": response}

@app.post("/api/rag-process")
async def rag_process():
    return {
        "status": "success",
        "simulated_result": "Context synthesized successfully from the neural matrix."
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
