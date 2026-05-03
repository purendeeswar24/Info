"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowRight, Palette } from "lucide-react";
import { Reveal } from "./Reveal";

export default function Hero() {
  const [theme, setTheme] = useState("gold");
  
  const themes = [
    { name: "gold", color: "#c5a021" },
    { name: "emerald", color: "#10b981" },
    { name: "ruby", color: "#e11d48" },
    { name: "cyan", color: "#06b6d4" }
  ];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleStartProtocol = () => {
    window.dispatchEvent(new CustomEvent("open-aura"));
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden bg-[#020c1b]">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a192f,0%,#020c1b_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#8892b0_1px,transparent_1px),linear-gradient(to_bottom,#8892b0_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Ambient Gold Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--gold)]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--gold)]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation - Premium glassmorphism */}
      <nav className="fixed top-8 z-50 px-8 py-4 bg-[#112240]/40 backdrop-blur-xl border border-[#233554] rounded-full flex items-center gap-6 md:gap-10 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#8892b0]">
        <a href="#about" className="hover:text-[var(--gold)] transition-all">About</a>
        <a href="#skills" className="hover:text-[var(--gold)] transition-all">Skills</a>
        <a href="#projects" className="hover:text-[var(--gold)] transition-all">Projects</a>
        <div className="w-[1px] h-4 bg-[#233554]" />
        
        {/* Theme Switcher */}
        <div className="flex items-center gap-3">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => setTheme(t.name)}
              className={`w-3 h-3 rounded-full border border-white/10 transition-transform ${theme === t.name ? 'scale-125 border-white/40' : 'hover:scale-110'}`}
              style={{ backgroundColor: t.color }}
              title={`${t.name} theme`}
            />
          ))}
        </div>
        
        <div className="w-[1px] h-4 bg-[#233554]" />
        <a href="mailto:purendeeswar444@gmail.com" className="text-[var(--gold)] hover:text-[var(--gold-light)] transition-all">Contact</a>
      </nav>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.3em]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--gold)]"></span>
            </span>
            System_Initialized_2026
          </motion.div>

          <Reveal width="100%">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 leading-[0.9] text-[#ccd6f6]">
              ENGINEERING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)] animate-gradient-x">INTELLIGENCE</span>
            </h1>
          </Reveal>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-2xl text-[#8892b0] max-w-3xl mx-auto mb-12 leading-relaxed font-light tracking-wide"
          >
            I'm <span className="text-[#ccd6f6] font-medium underline decoration-[var(--gold)]/30 underline-offset-8">Purendeeswar Reddy Mure</span>, 
            architecting autonomous multi-agent ecosystems and sophisticated RAG pipelines for the next era of business.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
            <motion.button 
              onClick={handleStartProtocol}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(var(--gold), 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#020c1b] rounded-xl font-black uppercase tracking-widest transition-all flex items-center gap-4 shadow-xl"
            >
              Start AI Protocol <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
            
            <a 
              href="/purendeeswar reddy.resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(35, 53, 84, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-transparent border-2 border-[var(--gold)] text-[var(--gold)] rounded-xl font-black uppercase tracking-widest transition-all flex items-center gap-4 w-full"
              >
                <Download size={20} /> Dossier
              </motion.button>
            </a>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex items-center justify-center gap-12 mt-20"
        >
          <a href="https://github.com/purendeeswar24" target="_blank" className="text-[#8892b0] hover:text-[var(--gold)] transition-all transform hover:-translate-y-2"><Github size={32} /></a>
          <a href="https://linkedin.com/in/purendeeswar-reddy5469" target="_blank" className="text-[#8892b0] hover:text-[var(--gold)] transition-all transform hover:-translate-y-2"><Linkedin size={32} /></a>
          <a href="mailto:purendeeswar444@gmail.com" className="text-[#8892b0] hover:text-[var(--gold)] transition-all transform hover:-translate-y-2"><Mail size={32} /></a>
        </motion.div>
      </div>
      
      {/* Refined Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] font-black text-[#8892b0]">Initiate Scroll</span>
        <motion.div 
          animate={{ y: [0, 12, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[2px] h-16 bg-gradient-to-b from-[var(--gold)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
