"use client";

import { motion } from "framer-motion";
import { Mic, Radio, Sparkles, Zap } from "lucide-react";
import { Reveal } from "./Reveal";

export default function RAGShowcase() {
  return (
    <section className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-24">
        <Reveal width="100%">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-[#ccd6f6] tracking-tighter uppercase">RAG System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]">Knowledge Engine</span></h2>
        </Reveal>
        <p className="text-[#8892b0] max-w-2xl mx-auto text-xl font-light tracking-wide">Retrieval Augmented Generation - Intelligent context-aware responses powered by professional expertise.</p>
      </div>

      <div className="relative group cursor-pointer">
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-[#112240] p-16 md:p-32 rounded-[40px] border border-[#233554] flex flex-col items-center text-center overflow-hidden">
            {/* Pulsing Voice Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div 
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeOut" }}
                    className="absolute w-[300px] h-[300px] border border-[var(--gold)]/20 rounded-full" 
                />
                <motion.div 
                    animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeOut" }}
                    className="absolute w-[300px] h-[300px] border border-[var(--gold)]/10 rounded-full" 
                />
            </div>

            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] flex items-center justify-center shadow-[0_0_50px_rgba(var(--gold),0.4)] mb-12 relative z-10"
            >
                <Mic size={48} className="text-[#020c1b]" />
            </motion.div>

            <h3 className="text-4xl md:text-6xl font-black text-[#ccd6f6] mb-6 tracking-tight relative z-10">ACTIVE</h3>
            
            <div className="flex items-center gap-4 px-8 py-3 bg-[#020c1b] rounded-full border border-[#233554] mb-12 relative z-10">
                <Radio className="text-[var(--gold)] animate-pulse" size={20} />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-[#ccd6f6]">Status: Knowledge_Indexed</span>
            </div>

            <p className="text-[#8892b0] text-lg max-w-xl font-light leading-relaxed mb-10 relative z-10">
                PREDAI's RAG system retrieves relevant professional context to provide accurate, informed responses about Purendeeswar's expertise, experience, and projects.
            </p>

            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 text-[var(--gold)] font-black uppercase tracking-[0.4em] text-[10px] border-b-2 border-[var(--gold)]/30 pb-2 relative z-10"
            >
                <Sparkles size={16} /> RAG Engine Active
            </motion.div>
        </div>
      </div>
    </section>
  );
}
