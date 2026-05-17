"""
Ollama-based Chat Agent for Purendeeswar's Portfolio
This agent uses the resume context to answer questions about Purendeeswar
Built with Ollama (100% local, no internet required)
"""

import os
from dotenv import load_dotenv
from typing import Optional, Any
from pathlib import Path
import requests
import json

# Load .env from the agent directory
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)

# Also try to load from parent directories for fallback
load_dotenv(override=False)

# ========================
# RESUME CONTEXT
# ========================

PURENDEESWAR_RESUME = """
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
Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion.
Databases: BigQuery, Cloud SQL, PostgreSQL, FAISS Vector DB.
DevOps: Docker, Google Cloud Build, CI/CD pipelines.

EXPERIENCE:
AI/ML Engineer — D3V Technologies (June 2025 – Present)
- Lead development of 'Agent Zone' platform - a multi-agent orchestration system
- Designed and implemented agentic workflows for enterprise automation
- Optimized LLM prompts for complex reasoning tasks
- Deployed agents on Google Cloud Run with monitoring and observability

Technical Team Lead — Populus
- Led RAG (Retrieval Augmented Generation) system development for construction sector
- Managed team of 3 engineers in building intelligent document processing pipelines
- Integrated Salesforce and HubSpot APIs for real-time data synchronization
- Achieved 94% accuracy in document classification tasks

AI & ML Intern — VRT Management Groups
- Developed NLP models for automated attendance tracking
- Built Python-based automation scripts reducing manual work by 60%
- Implemented chatbot interfaces for employee engagement

EDUCATION:
B.Tech in Computer Science & Engineering, KMM Institute of Technology and Science
CGPA: 8.6/10

PROJECTS:
1. Agent Zone Platform: Multi-agent orchestration system using Google ADK, LangChain, and Vertex AI
2. RAG Document Processing: Intelligent document search and retrieval using FAISS and embeddings
3. Portfolio Website: Next.js + FastAPI + Google ADK AI assistant
4. Attendance Automation: NLP-powered attendance tracking system

ACHIEVEMENTS:
- Pratibha Award 2025 for AI Research and Innovation
- 1st Place KSRM ML/AI Competition 2023
- Patent Pending: Multi-Agent System Architecture for Enterprise Automation
- Published Articles on AI/ML best practices and agentic systems

CERTIFICATIONS:
- Google Cloud Professional Cloud Architect (In Progress)
- Advanced Python for AI/ML Development
- LLM Fine-tuning and Prompt Engineering

INTERESTS:
- Building production-grade AI systems
- Multi-agent systems and orchestration
- LLM applications and prompt engineering
- Open-source contributions to AI tools
"""

# ========================
# TOOLS (Simple functions)
# ========================

def get_experience_summary() -> str:
    """Get Purendeeswar's professional experience summary."""
    return """
    EXPERIENCE:
    - Current: AI/ML Engineer at D3V Technologies (Lead for Agent Zone platform)
    - Previous: Technical Team Lead at Populus (RAG systems for construction)
    - Previous: AI & ML Intern at VRT Management Groups (NLP automation)
    """

def get_technical_skills() -> str:
    """Get Purendeeswar's technical skills."""
    return """
    TECHNICAL SKILLS:
    - Cloud: GCP, Vertex AI, Cloud Run, Cloud SQL, BigQuery
    - AI/ML: Multi-Agent Systems, RAG, LangChain, FAISS, Prompt Engineering
    - Backend: FastAPI, Python, RESTful APIs, Uvicorn, OAuth 2.0
    - Frontend: Next.js, React, TypeScript, Tailwind CSS
    - DevOps: Docker, Cloud Build, CI/CD pipelines
    - Databases: BigQuery, Cloud SQL, PostgreSQL, FAISS
    """

def get_projects_info() -> str:
    """Get information about Purendeeswar's projects."""
    return """
    PROJECTS:
    1. Agent Zone Platform - Multi-agent orchestration using Google technologies
    2. RAG Document Processing - Intelligent document search and retrieval
    3. Portfolio Website - Next.js + FastAPI with AI assistant
    4. Attendance Automation - NLP-powered attendance tracking system
    """

def get_contact_info() -> str:
    """Get Purendeeswar's contact information."""
    return """
    CONTACT INFORMATION:
    - Email: purendeeswar444@gmail.com
    - Phone: +91 6300263868
    - LinkedIn: linkedin.com/in/purendeeswar-reddy5469
    - GitHub: github.com/purendeeswar24
    """

def get_achievements() -> str:
    """Get Purendeeswar's achievements and awards."""
    return """
    ACHIEVEMENTS:
    - Pratibha Award 2025 for AI Research and Innovation
    - 1st Place KSRM ML/AI Competition 2023
    - Patent Pending: Multi-Agent System Architecture
    - B.Tech with 8.6 CGPA from KMM Institute
    """

# ========================
# AGENT CLASS
# ========================

class PortfolioAgent:
    """Portfolio AI Agent using Ollama (Local, No Internet)"""
    
    def __init__(self):
        self.name = "portfolio_assistant"
        self.model = "neural-chat"  # Smaller model (3.8B) - much faster on CPU than Mistral
        self.ollama_url = "http://localhost:11436/api/generate"  # Changed to port 11436
        self.ollama_base = "http://localhost:11436"  # Base URL for status checks
        
        # Check if Ollama is running
        self._check_ollama_status()
        
        print(f"✅ PREDAI Agent initialized with Ollama (Model: {self.model})")
        
        # Tool registry
        self.tools = {
            "get_experience_summary": get_experience_summary,
            "get_technical_skills": get_technical_skills,
            "get_projects_info": get_projects_info,
            "get_contact_info": get_contact_info,
            "get_achievements": get_achievements,
        }
        
        self.system_instruction = f"""You are PREDAI (Professional Expert Data & AI), the AI assistant for Purendeeswar Reddy Mure's portfolio website.

YOUR CONTEXT AND KNOWLEDGE:
{PURENDEESWAR_RESUME}

YOUR ROLE:
1. Answer questions about Purendeeswar's professional experience, skills, projects, and achievements
2. You have access to the following tools to retrieve accurate information:
   - get_experience_summary(): Get work history
   - get_technical_skills(): Get technical expertise
   - get_projects_info(): Get project details
   - get_contact_info(): Get contact information
   - get_achievements(): Get awards and achievements
3. Provide professional, engaging, and friendly responses
4. If asked about topics unrelated to Purendeeswar, answer as a helpful AI assistant
5. Always be accurate and ground your responses in the resume when available

RESPONSE STYLE:
- Be professional yet approachable
- Use clear, concise language
- Highlight relevant skills and experience when applicable
- Suggest tool usage when appropriate for accurate information"""
    
    def _check_ollama_status(self):
        """Check if Ollama service is running."""
        try:
            response = requests.get(f"{self.ollama_base}/api/tags", timeout=5)
            if response.status_code == 200:
                print("✅ Ollama service is running on port 11436")
                return True
            else:
                print("⚠️  Ollama service is not responding properly")
                return False
        except requests.exceptions.ConnectionError:
            print("❌ Ollama service is NOT running on port 11436!")
            print("📝 Please start Ollama by opening PowerShell and running:")
            print("   $env:OLLAMA_HOST = '127.0.0.1:11436'; ollama serve")
            raise ConnectionError(
                "Ollama is not running. Start it with: $env:OLLAMA_HOST = '127.0.0.1:11436'; ollama serve"
            )
    
    def process_message(self, user_message: str) -> str:
        """Process user message and return response using Ollama."""
        try:
            # Check if user is asking for tool-related information
            lower_msg = user_message.lower()
            
            # Automatically fetch relevant information
            context_parts = []
            
            if any(word in lower_msg for word in ["experience", "work", "job", "career"]):
                context_parts.append(get_experience_summary())
            
            if any(word in lower_msg for word in ["skill", "technical", "technology", "expertise"]):
                context_parts.append(get_technical_skills())
            
            if any(word in lower_msg for word in ["project", "work", "built", "developed"]):
                context_parts.append(get_projects_info())
            
            if any(word in lower_msg for word in ["contact", "reach", "email", "phone", "linkedin", "github"]):
                context_parts.append(get_contact_info())
            
            if any(word in lower_msg for word in ["award", "achievement", "accomplishment", "recognition"]):
                context_parts.append(get_achievements())
            
            # Build enhanced context
            enhanced_prompt = user_message
            if context_parts:
                enhanced_prompt = f"Using this context:\n\n{chr(10).join(context_parts)}\n\nPlease answer: {user_message}"
            
            # Combine system instruction with the prompt
            full_prompt = f"{self.system_instruction}\n\n---\n\nUser: {enhanced_prompt}"
            
            # Call Ollama API
            # timeout=(connect_timeout, read_timeout) - CPU inference is slow, need long timeout
            response = requests.post(
                self.ollama_url,
                json={
                    "model": self.model,
                    "prompt": full_prompt,
                    "stream": False,
                    "temperature": 0.5,  # Lower temp for faster convergence
                },
                timeout=(10, 600)  # 10s connect, 10 min for read (CPU can be slow)
            )
            
            if response.status_code == 200:
                result = response.json()
                if result.get("response"):
                    return result["response"].strip()
                else:
                    return "I'm having trouble forming a response. Please try again."
            else:
                return f"Error: Ollama returned status code {response.status_code}"
        
        except requests.exceptions.ConnectionError:
            print("❌ Cannot connect to Ollama. Is it running?")
            return "PREDAI Error: Ollama service is not running. Please start it with: ollama serve"
        except Exception as e:
            print(f"❌ Agent Error: {e}")
            import traceback
            traceback.print_exc()
            return f"PREDAI encountered an error: {str(e)}"

# ========================
# AGENT INSTANCE
# ========================

portfolio_agent = PortfolioAgent()

# Export for use in main FastAPI app
__all__ = ["portfolio_agent", "PURENDEESWAR_RESUME"]
