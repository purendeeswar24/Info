"use client";

import { motion } from "framer-motion";
import { ArrowRight, Database, Search, Sparkles, Zap } from "lucide-react";
import { Reveal } from "./Reveal";

export default function RAGVisualization() {
  const steps = [
    {
      icon: Sparkles,
      title: "User Query",
      description: "Natural language input from user",
      color: "from-[var(--gold)] to-[var(--gold-light)]"
    },
    {
      icon: Search,
      title: "RAG Search",
      description: "Keyword extraction & relevance scoring",
      color: "from-[var(--gold)] to-[var(--gold-light)]"
    },
    {
      icon: Database,
      title: "Context Retrieval",
      description: "Top N relevant resume chunks selected",
      color: "from-[var(--gold)] to-[var(--gold-light)]"
    },
    {
      icon: Zap,
      title: "LLM Generation",
      description: "neural-chat processes context & generates response",
      color: "from-[var(--gold)] to-[var(--gold-light)]"
    }
  ];

  return (
    <section className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-24">
        <Reveal width="100%">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-[#ccd6f6] tracking-tighter uppercase">
            RAG <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]">Flow Engine</span>
          </h2>
        </Reveal>
        <p className="text-[#8892b0] max-w-2xl mx-auto text-xl font-light tracking-wide">
          How PREDAI processes queries with Retrieval Augmented Generation to deliver accurate, context-aware responses
        </p>
      </div>

      {/* Flow Diagram */}
      <div className="relative">
        {/* Desktop Flow */}
        <div className="hidden md:grid grid-cols-4 gap-8 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                {/* Arrow to next */}
                {idx < steps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -right-[36px] top-12 z-10"
                  >
                    <ArrowRight className="text-[var(--gold)]" size={24} />
                  </motion.div>
                )}

                {/* Step Card */}
                <div className="p-8 bg-[#112240]/60 rounded-2xl border border-[#233554] hover:border-[var(--gold)]/50 transition-all group">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon size={32} className="text-[#020c1b]" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-[#ccd6f6] font-black text-lg mb-3 uppercase tracking-wider">{step.title}</h3>
                  <p className="text-[#8892b0] text-sm leading-relaxed">{step.description}</p>

                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[var(--gold)] text-[#020c1b] flex items-center justify-center font-black text-lg">
                    {idx + 1}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Flow */}
        <div className="md:hidden space-y-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-[#112240]/60 rounded-2xl border border-[#233554] relative"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                  <Icon size={24} className="text-[#020c1b]" />
                </div>
                <h3 className="text-[#ccd6f6] font-black text-base mb-2 uppercase">{step.title}</h3>
                <p className="text-[#8892b0] text-sm">{step.description}</p>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[var(--gold)] text-[#020c1b] flex items-center justify-center font-black text-sm">
                  {idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-24 pt-24 border-t border-[#233554]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-3xl md:text-4xl font-black text-[var(--gold)] mb-2">2-4</p>
          <p className="text-[#8892b0] text-sm uppercase tracking-wider">Context Chunks</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <p className="text-3xl md:text-4xl font-black text-[var(--gold)] mb-2">&lt;100ms</p>
          <p className="text-[#8892b0] text-sm uppercase tracking-wider">Search Time</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-3xl md:text-4xl font-black text-[var(--gold)] mb-2">95%+</p>
          <p className="text-[#8892b0] text-sm uppercase tracking-wider">Accuracy</p>
        </motion.div>
      </div>
    </section>
  );
}
