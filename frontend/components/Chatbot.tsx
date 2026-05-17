"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Zap, Cpu } from "lucide-react";
import RAGResultsPanel from "./RAGResultsPanel";

interface RAGResult {
  query: string;
  retrieved_context: string[];
  response: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "PREDAI System Initialized. I am your AI assistant for Purendeeswar's professional profile. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ragResult, setRagResult] = useState<RAGResult | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-aura", handleOpen);
    return () => window.removeEventListener("open-aura", handleOpen);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);
    setRagResult(null); // Clear previous RAG result

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });
      const data = await response.json();
      
      // Store RAG result for display
      if (data.retrieved_context) {
        setRagResult({
          query: data.query || currentInput,
          retrieved_context: data.retrieved_context,
          response: data.response,
        });
      }
      
      setMessages((prev) => [...prev, { role: "bot", text: data.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", text: "Signal interference detected. Re-establishing link..." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="mb-6 w-[400px] h-[600px] bg-[#020c1b] border border-[var(--gold)]/30 rounded-[32px] shadow-[0_0_100px_rgba(var(--gold),0.1)] flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#112240] to-[#0a192f] border-b border-[#233554] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center border border-[var(--gold)]/20">
                  <Cpu size={20} className="text-[var(--gold)]" />
                </div>
                <div>
                  <span className="block font-black text-xs uppercase tracking-[0.2em] text-[#ccd6f6]">PREDAI v1.0</span>
                  <span className="block text-[10px] text-[var(--gold)] font-bold uppercase tracking-widest animate-pulse">Professional Expert Data AI</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#8892b0] hover:text-[#ccd6f6] transition-colors"><X size={24} /></button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hide scroll-smooth"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed tracking-wide ${
                    m.role === "user" 
                    ? "bg-[var(--gold)] text-[#020c1b] font-bold rounded-tr-none shadow-lg" 
                    : "bg-[#112240] text-[#ccd6f6] border border-[#233554] rounded-tl-none"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {/* RAG Results Display */}
              {ragResult && (
                <div className="mt-6">
                  <RAGResultsPanel result={ragResult} isLoading={false} />
                </div>
              )}
              
              {isLoading && (
                <div className="flex gap-2 p-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--gold)] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[var(--gold)] animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-[var(--gold)] animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-[#233554] bg-[#112240]/50 flex gap-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask PREDAI..."
                className="flex-1 bg-[#020c1b] border border-[#233554] rounded-xl px-4 py-3 text-sm text-[#ccd6f6] placeholder:text-[#8892b0]/50 focus:outline-none focus:border-[var(--gold)]/50 transition-colors tracking-wider"
              />
              <button 
                onClick={handleSend} 
                className="w-12 h-12 bg-[var(--gold)] text-[#020c1b] rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[var(--gold)]/10 disabled:opacity-50"
                disabled={isLoading}
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-gradient-to-br from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)] rounded-full shadow-[0_0_50px_rgba(var(--gold),0.3)] flex items-center justify-center hover:shadow-[var(--gold)]/50 transition-all group"
      >
        <MessageSquare size={32} className="text-[#020c1b] group-hover:scale-110 transition-transform" />
      </motion.button>
    </div>
  );
}
