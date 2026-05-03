"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Reveal } from "./Reveal";

export default function Experience() {
  const experiences = [
    {
      company: "D3V Technologies",
      role: "AI/ML Engineer",
      period: "June 2025 - Present",
      desc: "Architected 'Agent Zone' Multi-Agent platform. Implemented A2A protocols and Gemini Enterprise infrastructure."
    },
    {
      company: "Populus",
      role: "Technical Team Lead",
      period: "Project Based",
      desc: "Led development of hybrid RAG-based document analysis systems and AI-powered vendor matching."
    },
    {
      company: "VRT Management Groups",
      role: "AI & ML Intern",
      period: "Jan 2025 - June 2025",
      desc: "Engineered AI-powered attendance systems and fine-tuned GPT models for NLP automation."
    }
  ];

  return (
    <section id="experience" className="py-40 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-24">
        <Reveal width="100%">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-[#ccd6f6] tracking-tighter uppercase">Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a021] to-[#f1d279]">Trajectory</span></h2>
        </Reveal>
      </div>

      <div className="space-y-16">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="flex gap-8 group"
          >
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#112240] border border-[#233554] flex items-center justify-center text-[#c5a021] group-hover:scale-110 transition-transform shadow-xl">
                <Briefcase size={24} />
              </div>
              <div className="w-0.5 flex-1 bg-gradient-to-b from-[#233554] to-transparent my-6" />
            </div>
            
            <div className="flex-1 pb-16">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h3 className="text-3xl font-black text-[#ccd6f6] tracking-tight">{exp.role}</h3>
                <span className="text-[10px] font-black text-[#c5a021] uppercase tracking-[0.3em] bg-[#c5a021]/5 px-5 py-2 rounded-full border border-[#c5a021]/20 h-fit">
                  {exp.period}
                </span>
              </div>
              <p className="text-[#c5a021] text-sm font-black uppercase tracking-[0.2em] mb-6">{exp.company}</p>
              <p className="text-[#8892b0] text-lg font-light leading-relaxed tracking-wide">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
