# Google ADK Agent Setup Guide

## Project Structure

```
backend/
├── main.py                    # FastAPI server with ADK integration
├── requirements.txt           # Python dependencies (includes google-adk)
├── agents/
│   └── chat_agent/
│       ├── agent.py          # ADK Agent definition with tools
│       ├── __init__.py        # Module initialization
│       └── .env              # Environment variables
├── Dockerfile
└── docker-compose.yml
```

## Setup Instructions

### 1. Install Dependencies

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate  # Windows
pip install -r requirements.txt
```

### 2. Configure API Key

Update the `.env` file in both locations:

**`backend/.env`:**
```
GOOGLE_API_KEY=your-actual-api-key
```

**`backend/agents/chat_agent/.env`:**
```
GOOGLE_API_KEY=your-actual-api-key
```

Or set as environment variable:
```powershell
$env:GOOGLE_API_KEY = "your-actual-api-key"
```

### 3. Run the Backend

```powershell
# From backend directory with venv activated
python main.py
```

Backend will start on `http://localhost:8000`

### 4. Test the Agent

**Check agent info:**
```bash
curl http://localhost:8000/api/agent-info
```

**Chat with the agent:**
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about Purendeeswar experience"}'
```

**Health check:**
```bash
curl http://localhost:8000/api/health
```

## Agent Capabilities

The AURA agent has access to the following tools:

1. **get_experience_summary()** - Professional experience and work history
2. **get_technical_skills()** - Technical expertise and technologies
3. **get_projects_info()** - Information about projects
4. **get_contact_info()** - Contact and social media links
5. **get_achievements()** - Awards and accomplishments

The agent uses Purendeeswar's full resume as context to provide accurate, personalized responses.

## Frontend Integration

Run the frontend in a separate terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend will be at `http://localhost:3000`

The frontend communicates with the backend at `http://localhost:8000/api/chat`

## Docker Deployment

Run both frontend and backend with Docker:

```powershell
$env:GOOGLE_API_KEY = "your-api-key"
docker-compose up --build
```

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Root endpoint with status info |
| `/api/chat` | POST | Chat with AURA agent |
| `/api/agent-info` | GET | Get agent capabilities |
| `/api/health` | GET | Health check |
| `/api/rag-process` | POST | RAG system status |

## Example Requests

### Chat Query
```json
{
  "message": "What are your technical skills?"
}
```

### Response
```json
{
  "response": "Based on your profile, your technical skills include: Cloud platforms like GCP and Vertex AI, AI/ML frameworks like LangChain and FAISS, Backend development with FastAPI and Python, Frontend development with Next.js and React, and DevOps with Docker and Cloud Build."
}
```

## Troubleshooting

### ModuleNotFoundError: google.adk
- Make sure you have installed google-adk: `pip install google-adk`
- Check requirements.txt includes `google-adk`

### GOOGLE_API_KEY not set
- Ensure the .env file has your API key
- Or set as environment variable before running

### Port 8000 already in use
- Change port in main.py: `uvicorn.run(app, host="0.0.0.0", port=8001)`

### Agent not responding
- Check logs for errors
- Verify API key is valid
- Ensure internet connection is available

## Features

✅ Google ADK Integration
✅ Resume Context Embedding
✅ Tool-based Information Retrieval
✅ FastAPI Backend
✅ Next.js Frontend
✅ CORS Enabled
✅ Docker Ready
✅ Async Processing

## Next Steps

1. ✓ Set up ADK agent with resume context
2. ✓ Configure FastAPI endpoints
3. ✓ Test agent locally with curl/Postman
4. ✓ Integrate with frontend
5. ⏳ Deploy to Google Cloud Run (when ready)
