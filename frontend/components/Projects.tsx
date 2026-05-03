"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code, ArrowRight, Layers, Settings, Globe } from "lucide-react";
import { Reveal } from "./Reveal";

export default function Projects() {
  const projects = [
    {
      title: "Agent Zone",
      tech: "FastAPI • A2A • GCP",
      desc: "Architected a comprehensive multi-agent substrate. Fully integrated with Google Workspace (Gmail, Drive, Docs) and 3rd-party connectors like Salesforce, HubSpot, and ClickUp."
    },
    {
      title: "Enterprise Automation Engine",
      tech: "Vertex AI • Cloud Run • Python",
      desc: "Developed a robust automation engine for enterprise-scale workflows, utilizing agentic reasoning to streamline complex business processes with 95% efficiency."
    },
    {
      title: "RAG Synthesis Engine",
      tech: "LangChain • FAISS • BigQuery",
      desc: "High-precision retrieval architecture achieving 88% accuracy across multi-terabyte unstructured datasets, optimized for construction and vendor management sectors."
    }
  ];

  return (
    <section id="projects" className="py-40 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <Reveal width="100%">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-[#ccd6f6] tracking-tighter uppercase">Frontier <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a021] to-[#f1d279]">Deployments</span></h2>
        </Reveal>
        <p className="text-[#8892b0] max-w-2xl mx-auto text-xl font-light tracking-wide">Synthesizing raw intelligence into robust, production-grade AI architectures.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            whileHover={{ 
              rotateX: 2, 
              rotateY: -2, 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            }}
            className="group p-10 bg-[#112240]/60 backdrop-blur-2xl rounded-[40px] border border-[#233554] hover:border-[#c5a021]/40 relative overflow-hidden flex flex-col h-full transition-all duration-500 perspective-1000"
          >
            <div className="absolute -top-10 -right-10 p-12 opacity-[0.03] group-hover:opacity-10 transition-all group-hover:rotate-12 group-hover:scale-150">
              <Layers size={140} className="text-[#c5a021]" />
            </div>
            
            <div className="mb-8">
                <span className="px-4 py-1.5 bg-[#c5a021]/10 text-[#c5a021] text-[9px] font-black uppercase tracking-[0.3em] rounded-full border border-[#c5a021]/20">
                    SOP_PROTO_0{i + 1}
                </span>
            </div>

            <h3 className="text-3xl font-black mb-4 text-[#ccd6f6] group-hover:text-[#c5a021] transition-colors tracking-tight">{p.title}</h3>
            <p className="text-[#c5a021] text-[10px] font-black tracking-widest mb-8 bg-[#c5a021]/5 py-2 px-4 rounded-xl inline-block w-fit border border-[#c5a021]/10 uppercase">{p.tech}</p>
            <p className="text-[#8892b0] text-lg mb-10 leading-relaxed flex-grow font-light tracking-wide">{p.desc}</p>
            
            <button className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#ccd6f6] group-hover:text-[#c5a021] transition-all mt-auto border-t border-[#233554] pt-8 group-hover:gap-5">
              Deep Scan Architecture <ArrowRight size={20} className="text-[#c5a021]" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
