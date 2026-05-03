"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

export default function Skills() {
  const categories = [
    { name: "Cloud Infrastructure", skills: ["GCP", "Vertex AI", "Cloud Run", "Cloud SQL", "BigQuery"] },
    { name: "Neural Architectures", skills: ["Multi-Agent Systems", "RAG", "Gemini API", "LangChain", "Vector Search"] },
    { name: "Core Systems", skills: ["FastAPI", "Python", "REST APIs", "OAuth 2.0", "MCP"] },
    { name: "External Matrix", skills: ["Composio", "Salesforce API", "HubSpot CRM", "ClickUp API"] },
    { name: "Deployment Ops", skills: ["Docker", "CI/CD", "GitHub Actions", "Artifact Registry"] }
  ];

  return (
    <section id="skills" className="py-40 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#c5a021]/5 rounded-full blur-[120px] -z-10" />
      
      <div className="text-center mb-24">
        <Reveal width="100%">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-[#ccd6f6] tracking-tighter uppercase">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a021] to-[#f1d279]">Arsenal</span></h2>
        </Reveal>
        <p className="text-[#8892b0] max-w-2xl mx-auto text-xl font-light tracking-wide">Constructing high-fidelity intelligent systems through a curated stack of frontier technologies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -10 }}
            className="p-10 bg-[#112240]/40 backdrop-blur-md rounded-[32px] border border-[#233554] hover:border-[#c5a021]/30 transition-all group shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a021]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-14 h-14 rounded-2xl bg-[#c5a021]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-[#c5a021]/20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#c5a021] animate-pulse" />
            </div>
            
            <h3 className="text-[#ccd6f6] text-xl font-black mb-8 tracking-[0.1em] uppercase">{cat.name}</h3>
            
            <div className="flex flex-wrap gap-3">
              {cat.skills.map((skill, si) => (
                <span key={si} className="px-5 py-2 bg-[#020c1b] rounded-xl text-xs font-bold text-[#8892b0] border border-[#233554] hover:border-[#c5a021]/50 hover:text-[#c5a021] transition-all tracking-wider uppercase">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
