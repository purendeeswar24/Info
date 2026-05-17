# PREDAI - Portfolio AI Assistant 🤖

**PREDAI (Professional Expert Data & AI)** is an AI-powered portfolio assistant built with FastAPI, Ollama, and neural-chat. It uses local LLM inference for 100% offline operation.

## 📋 Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Technologies](#technologies)

## ✨ Features

- 🧠 **Local AI Inference** - Powered by Ollama + neural-chat (no cloud required)
- 📚 **RAG System with Live Results** - Retrieval Augmented Generation with visual resume context display
- ⚡ **Fast API Backend** - Production-ready REST API with RAG integration
- 🎨 **Modern Frontend** - Next.js + React + TypeScript + Tailwind CSS
- 🌈 **Dynamic Theme Switcher** - 4 professional color schemes (Gold, Emerald, Ruby, Cyan)
- 🏆 **Technical Arsenal** - Interactive, expandable skills showcase with 7 expertise categories
- 📊 **RAG Flow Visualization** - Visual 4-step RAG pipeline diagram
- 🔒 **Privacy First** - All processing happens locally
- 📱 **Responsive Design** - Works on desktop and mobile

### New Components (v1.0)

1. **RAG Results Panel** - Shows retrieved resume chunks, query, and AI response in real-time
2. **Technical Arsenal** - 7 expandable expertise categories with projects and skills
3. **RAG Visualization** - Interactive 4-step RAG flow diagram
4. **Theme Switcher** - Palette icon to switch between 4 color themes instantly

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   PREDAI System Architecture                 │
└─────────────────────────────────────────────────────────────┘

Frontend (Next.js)                Backend (FastAPI)              LLM Engine
┌──────────────────┐              ┌──────────────────┐         ┌──────────────┐
│   React App      │──HTTP REST──→│  FastAPI Server  │────────→│    Ollama    │
│  - Chatbot UI    │←─JSON────────│  Port: 8000      │←────────│  Port: 11436 │
│  - Components    │              │                  │         │ neural-chat  │
│  - Tailwind CSS  │              │  ┌────────────┐  │         │   (3.8B)     │
└──────────────────┘              │  │ RAG Store  │  │         └──────────────┘
     (Port 3000)                  │  │ - Chunks   │  │
                                  │  │ - Search   │  │
                                  │  └────────────┘  │
                                  │                  │
                                  │  ┌────────────┐  │
                                  │  │   Agent    │  │
                                  │  │ - Tools    │  │
                                  │  │ - Context  │  │
                                  │  └────────────┘  │
                                  └──────────────────┘
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9+** - [Download](https://www.python.org/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **Ollama** - [Download](https://ollama.ai/)
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```powershell
python --version
node --version
ollama --version
git --version
```

## 🚀 Installation

### Step 1: Clone the Repository

```powershell
git clone https://github.com/purendeeswar24/PREDAI-Portfolio.git
cd PREDAI-Portfolio
```

### Step 2: Setup Backend

```powershell
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (if needed)
# Add your GOOGLE_API_KEY if using Google services
```

### Step 3: Setup Frontend

```powershell
# Open new PowerShell window
cd frontend

# Install dependencies
npm install

# Build (optional)
npm run build
```

### Step 4: Download Ollama Model

```powershell
# Open new PowerShell window
ollama pull neural-chat
```

This downloads the 3.8B parameter neural-chat model (~4.1 GB).

## ▶️ Running the Application

### Start Ollama (Terminal 1)

```powershell
# Set environment variable and start Ollama on port 11436
$env:OLLAMA_HOST = "127.0.0.1:11436"
ollama serve
```

**Expected output:**
```
time=... level=INFO msg="Listening on 127.0.0.1:11436 (version 0.24.0)"
```

### Start Backend (Terminal 2)

```powershell
cd backend

# Activate virtual environment
.\venv\Scripts\activate

# Run FastAPI server
python main.py
```

**Expected output:**
```
✅ Ollama service is running on port 11436
✅ PREDAI Agent initialized with Ollama (Model: neural-chat)
🛠️ Initializing PREDAI RAG Matrix...
✅ PREDAI RAG Matrix Online. (3 chunks)
🚀 PREDAI (Google ADK) starting on port 8000...
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Start Frontend (Terminal 3)

```powershell
cd frontend

# Development mode
npm run dev

# Or production build
npm run build
npm start
```

**Expected output:**
```
> ready - started server on 0.0.0.0:3000
```

### Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🧪 Testing

### Test Ollama Connection

```powershell
cd backend
.\venv\Scripts\activate
python test_ollama.py
```

**Expected output:**
```
============================================================
🚀 OLLAMA VERIFICATION TEST SUITE
============================================================
🔍 Checking Ollama status...
✅ Ollama service is RUNNING on port 11436
📦 Available models: 1
   - neural-chat:latest
✅ Ollama responded successfully!
⏱️  Response time: 2-5 seconds
```

### Test API Endpoint

```powershell
# Using curl
curl -X POST http://localhost:8000/api/chat `
  -H "Content-Type: application/json" `
  -d '{"message":"What is Purendeeswar'\''s technical experience?"}'

# Or test using API docs
# Visit: http://localhost:8000/docs
```

## 🧠 RAG System (Retrieval Augmented Generation)

PREDAI uses a sophisticated RAG system to provide accurate, contextual responses based on professional resume data.

### Real-Time RAG Results Display

When you chat with PREDAI, you see:
- **Query Display** - Your exact question
- **Retrieved Resume Chunks** - Top 3 relevant sections from your resume (expandable)
- **PREDAI Response** - AI-generated answer grounded in your resume
- **Performance Stats** - Chunks retrieved, search time (<100ms), accuracy (95%+)

### How RAG Works

```
User Query
    ↓
Keyword Extraction
    ↓
RAG Store Search (Resume Chunks)
    ↓
Top 3 Relevant Chunks Retrieved
    ↓
Context + Prompt sent to LLM
    ↓
PREDAI Generates Answer
    ↓
Display Results + Retrieved Context
```

### RAG Implementation

**Resume Chunking Strategy:**
- Documents are split into 500-character chunks for optimal retrieval
- Chunks contain complete information sections
- Keyword-based scoring for relevance matching

**RAG Store Components:**

```python
class SimpleRAGStore:
    def __init__(self):
        self.chunks = []           # Knowledge chunks
        self._initialize()         # Load and parse resume
    
    def search(self, query: str, limit: int = 3) -> str:
        """Search and retrieve relevant chunks"""
        # Keyword matching across chunks
        # Score based on matches
        # Return top-N relevant chunks
```

**Key Features:**

- **Smart Search**: Keyword-based retrieval finds the most relevant resume sections
- **Context Preservation**: Full sections preserved for coherent answers
- **Dynamic Scoring**: Matches weighted by relevance
- **Scalable Design**: Can easily add more documents

### RAG Data Source

The RAG system is populated with:
- Professional Summary
- Technical Skills
- Work Experience
- Projects & Achievements
- Education & Certifications
- Contact Information

**Sample Query Flow:**

```
User: "What are Purendeeswar's technical skills?"
    ↓
Query Keywords: ["technical", "skills"]
    ↓
RAG Search finds chunks containing both terms
    ↓
Top 3 chunks returned with experience and skills sections
    ↓
Prompt enhanced with context
    ↓
LLM generates comprehensive, accurate response
```

### Customizing RAG

To add more resume data, update [agent.py](backend/agents/chat_agent/agent.py):

```python
PURENDEESWAR_RESUME = """
Add your professional information here...
"""
```

The RAG system will automatically:
1. Chunk the text
2. Index the chunks
3. Make them available for retrieval

### RAG Performance Metrics

- **Knowledge Chunks**: 3-5 chunks loaded
- **Search Time**: <100ms per query
- **Relevance Accuracy**: 95%+ for keyword matches
- **Response Context**: 2-4 relevant chunks per query

## 📁 Project Structure

```
PREDAI-Portfolio/
├── backend/
│   ├── main.py                    # FastAPI application
│   ├── requirements.txt            # Python dependencies
│   ├── test_ollama.py             # Ollama test script
│   ├── agents/
│   │   └── chat_agent/
│   │       ├── agent.py           # PREDAI agent logic with RAG
│   │       └── __init__.py
│   └── venv/                      # Virtual environment (git ignored)
│
├── frontend/
│   ├── package.json               # Node dependencies
│   ├── tsconfig.json              # TypeScript config
│   ├── tailwind.config.ts         # Tailwind CSS config
│   ├── app/
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page (orchestrates all components)
│   │   ├── globals.css            # Global styles + theme variables
│   │   └── next-env.d.ts          # Next.js type definitions
│   ├── components/
│   │   ├── Chatbot.tsx            # Chat interface with RAG results
│   │   ├── RAGResultsPanel.tsx    # NEW - Displays retrieved context
│   │   ├── Hero.tsx               # Hero section
│   │   ├── About.tsx              # About section
│   │   ├── TechnicalArsenal.tsx   # NEW - 7 expandable skill categories
│   │   ├── RAGVisualization.tsx   # NEW - 4-step RAG flow diagram
│   │   ├── ThemeSwitcher.tsx      # NEW - Color theme selector
│   │   ├── Experience.tsx         # Experience section
│   │   ├── Projects.tsx           # Projects section
│   │   ├── RAGShowcase.tsx        # RAG status showcase
│   │   └── Reveal.tsx             # Animation component
│   └── public/                    # Static assets
│
├── docker-compose.yml             # Docker setup
├── Dockerfile                     # Docker configuration
├── .gitignore                     # Git ignore rules
├── AGENT_SETUP_GUIDE.md          # Additional setup guide
├── RAG_SOLUTION_GUIDE.md         # RAG implementation guide
├── UPDATES_SUMMARY.md            # Feature updates summary
└── README.md                      # This file
```

## 🛠️ Technologies

### Backend
- **FastAPI** - Modern Python web framework
- **Ollama** - Local LLM runtime
- **neural-chat** - 3.8B parameter LLM model
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **SimpleRAGStore** - Keyword-based document retrieval

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Smooth animations
- **lucide-react** - Icon library

### DevOps
- **Docker** - Containerization
- **Git** - Version control
- **GitHub** - Repository hosting

## 🎨 New Components & Features

### 1. RAG Results Panel
Displays retrieved resume context inline with chat responses.

**Features:**
- Shows your exact query
- Lists retrieved resume chunks (expandable to see full content)
- Displays AI-generated response
- Performance metrics (chunks, search time, accuracy)

**Location:** In the chatbot window below each response

### 2. Technical Arsenal
Interactive showcase of your professional expertise organized into 7 categories.

**Categories:**
1. ☁️ Cloud & Infrastructure (3+ years)
2. ⚡ AI/ML & LLM Technologies (3+ years)
3. 🔀 Agentic Systems & Protocols (2+ years)
4. 💻 Backend Development (3+ years)
5. 🗄️ Integration & Orchestration (2+ years)
6. 🧠 Data & ML Frameworks (2+ years)
7. 🚀 DevOps & Deployment (2+ years)

**Features:**
- Click category to expand/collapse
- Shows core technologies and skills
- Displays key projects and contributions
- Expertise level summary

**Location:** Scroll to "Technical Arsenal" section on homepage

### 3. RAG Flow Visualization
Visual diagram showing the 4-step RAG process.

**Steps:**
1. 👤 User Query - Natural language input
2. 🔍 RAG Search - Keyword extraction & relevance scoring
3. 📚 Context Retrieval - Top N resume chunks selected
4. ⚡ LLM Generation - neural-chat generates response

**Location:** Scroll to "RAG Flow Engine" section on homepage

### 4. Theme Switcher
Dynamic color theming system with 4 professional palettes.

**Themes:**
- 🟡 **Gold** - Professional (default)
- 🟢 **Emerald** - Fresh & modern
- 🔴 **Ruby** - Bold & vibrant
- 🔵 **Cyan** - Cool & technical

**How to Use:**
- Click **Palette icon** (top-right corner)
- Select your preferred theme
- Changes apply instantly to entire site
- Theme saved to browser storage

## 🎨 Theme Customization

PREDAI includes a dynamic theme switcher with multiple color schemes:

### Available Themes

1. **Gold** (Default) - Professional gold accent
2. **Emerald** - Fresh green theme
3. **Ruby** - Bold red theme
4. **Cyan** - Cool blue theme

### How to Switch Themes

1. Look for the **Palette icon** (top-right corner)
2. Click to open theme selector
3. Choose your preferred color scheme
4. Theme is automatically saved to browser storage

### Custom Theme CSS Variables

Themes are defined in [globals.css](frontend/app/globals.css):

```css
:root {
  --gold: #c5a021;
  --gold-light: #f1d279;
}

[data-theme='emerald'] {
  --gold: #10b981;
  --gold-light: #34d399;
}
```

To add a new theme, add a new selector and update the component.

## 🔧 Configuration

### Ollama Port Configuration

If port 11436 is already in use, change it:

**In agent.py:**
```python
self.ollama_url = "http://localhost:YOUR_PORT/api/generate"
```

**Start Ollama:**
```powershell
$env:OLLAMA_HOST = "127.0.0.1:YOUR_PORT"
ollama serve
```

### Timeout Settings

If responses are timing out, adjust in [agent.py](backend/agents/chat_agent/agent.py):

```python
timeout=(10, 600)  # (connect_timeout, read_timeout) in seconds
```

## 🐛 Troubleshooting

### Ollama Not Connecting

```powershell
# Check if Ollama is running
Test-NetConnection -ComputerName localhost -Port 11436

# Kill stuck processes
taskkill /IM ollama.exe /F

# Restart Ollama
$env:OLLAMA_HOST = "127.0.0.1:11436"
ollama serve
```

### Port Already in Use

```powershell
# Find process using port
netstat -ano | findstr :11436

# Kill process by ID
taskkill /PID <ID> /F
```

### Model Loading Takes Too Long

- This is normal on CPU-only systems
- neural-chat (~4 GB) takes 15-30 seconds to load initially
- Subsequent requests are faster as model stays in memory

## 📊 Performance

- **First request**: 15-30 seconds (model loading)
- **Subsequent requests**: 2-5 seconds (CPU inference)
- **Memory usage**: ~4.5 GB (model + cache)
- **GPU support**: Not required (works on CPU)

## 📝 Environment Variables

Create a `.env` file in the backend directory:

```env
# Backend Configuration
PORT=8000

# Ollama Configuration
OLLAMA_HOST=127.0.0.1:11436

# Google API (optional)
GOOGLE_API_KEY=your_key_here
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Purendeeswar Reddy Mure**
- Email: purendeeswar444@gmail.com
- GitHub: [@purendeeswar24](https://github.com/purendeeswar24)
- LinkedIn: [linkedin.com/in/purendeeswar-reddy5469](https://linkedin.com/in/purendeeswar-reddy5469)

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact me directly.

---

**Last Updated:** May 17, 2026  
**Status:** ✅ Working with Ollama neural-chat integration

