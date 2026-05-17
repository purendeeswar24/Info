"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Briefcase, Code, Cloud, Zap, Database, Cpu, GitBranch } from "lucide-react";
import { Reveal } from "./Reveal";

export default function TechnicalArsenal() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const arsenalCategories = [
    {
      icon: Cloud,
      title: "Cloud & Infrastructure",
      years: "3+ Years",
      skills: ["GCP", "Vertex AI", "Cloud Run", "Cloud SQL", "Cloud Scheduler", "BigQuery", "Secret Manager", "IAM", "VPC Connectors"],
      projects: [
        "Architected Agent Zone multi-agent platform with FastAPI on Cloud Run",
        "Deployed Gemini Enterprise infrastructure with ACL & Discovery Engine",
        "Built custom Salesforce connector with tri-tier deployment architecture"
      ],
      experience: "Expert in deploying production-grade AI systems on GCP with enterprise-scale infrastructure"
    },
    {
      icon: Zap,
      title: "AI/ML & LLM Technologies",
      years: "3+ Years",
      skills: ["Vertex AI Studio", "Gemini API", "Agent Development Kit", "Multi-Agent Systems", "RAG", "Hybrid Search", "Vector Embeddings", "LangChain", "FAISS"],
      projects: [
        "Developed RAG-based document analysis system for construction industry (Populus)",
        "Built WhatsApp AI chatbot with Gemini 2.0 Flash via Twilio",
        "Implemented Vertex AI RAG agent with corpus management & preprocessing"
      ],
      experience: "Specialized in building production LLM applications with advanced RAG pipelines and multi-agent orchestration"
    },
    {
      icon: GitBranch,
      title: "Agentic Systems & Protocols",
      years: "2+ Years",
      skills: ["Agent-to-Agent (A2A)", "Model Context Protocol (MCP)", "Multi-Agentic Workflows", "Dynamic Prompts", "Workflow Templates", "Agent Orchestration"],
      projects: [
        "Implemented A2A protocol for seamless Salesforce, HubSpot, ClickUp integration",
        "Built 7 specialized A2A agents (Orchestrator, CRM, Task Mgmt, Workspace, Workflow Engine)",
        "Integrated MCP for all application connectors with Composio OAuth flows"
      ],
      experience: "Led enterprise agent orchestration with cross-platform A2A protocols for autonomous systems"
    },
    {
      icon: Code,
      title: "Backend Development",
      years: "3+ Years",
      skills: ["FastAPI", "Python", "RESTful APIs", "Uvicorn", "OAuth 2.0", "JWT Auth", "Database Design", "MySQL"],
      projects: [
        "Architected complete FastAPI backend for Agent Zone platform (independent ownership)",
        "Built PREDAI AI assistant with FastAPI + Ollama neural-chat integration",
        "Implemented tenant management, workflow scheduler, & comprehensive API endpoints"
      ],
      experience: "Full-stack backend expert building scalable REST APIs and microservices for AI platforms"
    },
    {
      icon: Database,
      title: "Integration & Orchestration",
      years: "2+ Years",
      skills: ["Composio", "Salesforce Bulk API 2.0", "HubSpot CRM API", "ClickUp API", "Google Workspace APIs", "Discovery Engine API", "SendGrid API"],
      projects: [
        "Integrated 7 third-party platforms via Composio for Agent Zone",
        "Built SendGrid email automation (35% improvement in lead follow-up)",
        "Configured Google Drive & Discovery Engine for document processing"
      ],
      experience: "Expert in seamless third-party integrations enabling autonomous agent communication"
    },
    {
      icon: Cpu,
      title: "Data & ML Frameworks",
      years: "2+ Years",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "XGBoost", "CatBoost", "Hugging Face", "spaCy"],
      projects: [
        "Salary prediction model with XGBoost (83% accuracy)",
        "NLP fine-tuning with OpenAI GPT (90% accuracy in text generation)",
        "Ideal Customer Profile prediction with KNN & decision trees (15% improvement)"
      ],
      experience: "Data science expert with experience in ML model optimization and NLP tasks"
    },
    {
      icon: GitBranch,
      title: "DevOps & Deployment",
      years: "2+ Years",
      skills: ["Docker", "Cloud Build", "CI/CD", "GitHub Actions", "Artifact Registry", "Streamlit", "Gradio", "Ngrok"],
      projects: [
        "Containerized multi-agent platform with Docker for cloud deployment",
        "Implemented CI/CD pipelines with GitHub Actions & Cloud Build",
        "Built Streamlit dashboards for real-time data visualization & analysis"
      ],
      experience: "DevOps specialist in containerization, automation, and production deployment"
    }
  ];

  return (
    <section className="py-40 px-6 max-w-7xl mx-auto overflow-hidden" id="arsenal">
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[var(--gold)]/5 rounded-full blur-[120px] -z-10" />
      
      <div className="text-center mb-24">
        <Reveal width="100%">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-[#ccd6f6] tracking-tighter uppercase">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]">Arsenal</span>
          </h2>
        </Reveal>
        <p className="text-[#8892b0] max-w-3xl mx-auto text-xl font-light tracking-wide">
          3+ years of AI/ML engineering expertise across cloud infrastructure, agentic systems, and production LLM applications
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {arsenalCategories.map((category, idx) => {
          const Icon = category.icon;
          const isExpanded = expanded === idx;

          return (
            <motion.div
              key={idx}
              layout
              className="overflow-hidden"
            >
              {/* Header */}
              <motion.button
                onClick={() => setExpanded(isExpanded ? null : idx)}
                className="w-full p-8 bg-[#112240]/60 backdrop-blur-md rounded-2xl border border-[#233554] hover:border-[var(--gold)]/50 transition-all group flex items-center justify-between"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-6 text-left">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] flex items-center justify-center flex-shrink-0"
                  >
                    <Icon size={32} className="text-[#020c1b]" />
                  </motion.div>

                  <div>
                    <h3 className="text-[#ccd6f6] font-black text-xl uppercase tracking-wider mb-2">
                      {category.title}
                    </h3>
                    <p className="text-[var(--gold)] text-sm font-bold uppercase tracking-widest">
                      {category.years} EXPERIENCE
                    </p>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={28} className="text-[var(--gold)]" />
                </motion.div>
              </motion.button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 bg-[#0a1628]/80 border-x border-b border-[#233554] rounded-b-2xl space-y-8">
                      {/* Skills */}
                      <div>
                        <h4 className="text-[#ccd6f6] font-black uppercase tracking-wider mb-4 text-sm">
                          Core Technologies
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {category.skills.map((skill, si) => (
                            <motion.span
                              key={si}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: si * 0.05 }}
                              className="px-4 py-2 bg-[#112240] rounded-lg text-xs font-bold text-[var(--gold)] border border-[var(--gold)]/30 hover:border-[var(--gold)] transition-all uppercase tracking-wider"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Projects */}
                      <div>
                        <h4 className="text-[#ccd6f6] font-black uppercase tracking-wider mb-4 text-sm">
                          Key Projects & Contributions
                        </h4>
                        <div className="space-y-3">
                          {category.projects.map((project, pi) => (
                            <motion.div
                              key={pi}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: pi * 0.1 }}
                              className="p-4 bg-[#020c1b] rounded-lg border border-[#233554] hover:border-[var(--gold)]/30 transition-all"
                            >
                              <div className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0" />
                                <p className="text-[#8892b0] text-sm leading-relaxed">{project}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Experience Summary */}
                      <div className="p-6 bg-gradient-to-r from-[var(--gold)]/5 to-[var(--gold-light)]/5 rounded-lg border border-[var(--gold)]/20">
                        <p className="text-[#ccd6f6] font-bold uppercase tracking-widest text-xs mb-2">
                          EXPERTISE LEVEL
                        </p>
                        <p className="text-[#8892b0] leading-relaxed">{category.experience}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 pt-24 border-t border-[#233554] grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        <div className="text-center">
          <p className="text-4xl font-black text-[var(--gold)] mb-2">7</p>
          <p className="text-[#8892b0] uppercase tracking-wider text-sm font-bold">A2A Agents Built</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-black text-[var(--gold)] mb-2">5+</p>
          <p className="text-[#8892b0] uppercase tracking-wider text-sm font-bold">Enterprise Integrations</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-black text-[var(--gold)] mb-2">10+</p>
          <p className="text-[#8892b0] uppercase tracking-wider text-sm font-bold">Production Deployments</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-black text-[var(--gold)] mb-2">90%+</p>
          <p className="text-[#8892b0] uppercase tracking-wider text-sm font-bold">Success Rate</p>
        </div>
      </motion.div>
    </section>
  );
}
