"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, BrainCircuit } from "lucide-react";
import { Reveal } from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative flex-1"
        >
          <div className="absolute -inset-10 bg-[#c5a021]/5 rounded-full blur-[100px] -z-10" />
          <div className="bg-[#112240] border border-[#233554] p-1 rounded-[40px] shadow-2xl overflow-hidden aspect-square max-w-lg mx-auto group relative">
            <div className="w-full h-full bg-[#020c1b] rounded-[38px] flex flex-col items-center justify-center p-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#c5a021_1px,transparent_1px)] bg-[size:30px_30px]" />
                </div>
                
                <motion.div 
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="relative z-10 text-[#c5a021] filter drop-shadow-[0_0_40px_rgba(197,160,33,0.3)]"
                >
                    <BrainCircuit size={160} strokeWidth={0.5} />
                </motion.div>
                
                <div className="mt-12 text-center relative z-10">
                    <p className="font-black text-[#c5a021] text-[10px] tracking-[0.5em] mb-4">CORE_NEURAL_LINK_ACTIVE</p>
                    <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-[#c5a021] to-transparent mx-auto rounded-full" />
                </div>
            </div>
          </div>
          
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -right-6 top-1/4 p-6 bg-[#112240]/90 backdrop-blur-xl border border-[#c5a021]/30 rounded-3xl shadow-2xl hidden md:block"
          >
            <p className="text-[#c5a021] font-black text-3xl leading-none">50+</p>
            <p className="text-[#8892b0] text-[9px] uppercase font-black tracking-[0.2em] mt-2">AI Architectures</p>
          </motion.div>
        </motion.div>

        <div className="flex-1 space-y-12">
          <Reveal width="100%">
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-[#ccd6f6] leading-[1.1] tracking-tighter">
              BENDING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a021] to-[#f1d279]">POSSIBILITY</span>
            </h2>
          </Reveal>
          
          <Reveal width="100%">
            <p className="text-[#8892b0] text-xl md:text-2xl leading-relaxed font-light tracking-wide">
                Specializing in <span className="text-[#ccd6f6] font-medium border-b border-[#c5a021]/40">Multi-Agent Systems</span> and 
                <span className="text-[#ccd6f6] font-medium border-b border-[#c5a021]/40"> Hyper-Personalized RAG</span>. 
                I build autonomous intelligence that doesn't just process data—it reasons through it.
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-[#112240]/40 rounded-3xl border border-[#233554] hover:border-[#c5a021]/40 transition-all group"
            >
              <Award className="text-[#c5a021] mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h4 className="text-[#ccd6f6] font-black text-lg mb-2 uppercase tracking-wider">Pratibha Award 2025</h4>
              <p className="text-[#8892b0] text-sm leading-relaxed font-light">Excellence in AI Research conferred by the Andhra Pradesh Government.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-[#112240]/40 rounded-3xl border border-[#233554] hover:border-[#c5a021]/40 transition-all group"
            >
              <GraduationCap className="text-[#c5a021] mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h4 className="text-[#ccd6f6] font-black text-lg mb-2 uppercase tracking-wider">B.Tech CSE</h4>
              <p className="text-[#8892b0] text-sm leading-relaxed font-light">KMM Institute of Technology. (8.6 CGPA) Specialized in Machine Intelligence.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
