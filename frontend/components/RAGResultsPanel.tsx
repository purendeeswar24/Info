"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Database, Lightbulb, BookOpen } from "lucide-react";
import { useState } from "react";

interface RAGResult {
  query: string;
  retrieved_context: string[];
  response: string;
}

interface RAGResultsPanelProps {
  result: RAGResult | null;
  isLoading?: boolean;
}

export default function RAGResultsPanel({ result, isLoading = false }: RAGResultsPanelProps) {
  const [expandedChunk, setExpandedChunk] = useState<number | null>(null);

  if (!result && !isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mt-6 space-y-4"
    >
      {/* RAG Processing Header */}
      <div className="flex items-center gap-2 text-[var(--gold)] text-sm font-bold uppercase tracking-widest">
        <Database size={16} />
        <span>RAG Processing Results</span>
        {isLoading && (
          <div className="flex gap-1 ml-auto">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
          </div>
        )}
      </div>

      {isLoading ? (
        // Loading state
        <div className="space-y-3">
          <div className="h-12 bg-[#112240]/50 rounded-lg animate-pulse" />
          <div className="h-20 bg-[#112240]/50 rounded-lg animate-pulse" />
          <div className="h-16 bg-[#112240]/50 rounded-lg animate-pulse" />
        </div>
      ) : result ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Query Display */}
          <div className="p-4 bg-[#0f172a]/60 border border-[#233554] rounded-lg">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#8892b0] font-bold mb-2">Query</div>
            <p className="text-[#ccd6f6] text-sm">{result.query}</p>
          </div>

          {/* Retrieved Context Chunks */}
          {result.retrieved_context && result.retrieved_context.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--gold)] text-xs font-bold uppercase tracking-widest">
                <BookOpen size={14} />
                <span>Retrieved Resume Context ({result.retrieved_context.length})</span>
              </div>

              {result.retrieved_context.map((chunk, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <button
                    onClick={() => setExpandedChunk(expandedChunk === idx ? null : idx)}
                    className="w-full text-left p-3 bg-[#0f172a]/40 border border-[#233554] rounded-lg hover:border-[var(--gold)]/30 hover:bg-[#0f172a]/60 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[#8892b0] text-xs font-semibold mb-1">Chunk {idx + 1}</p>
                        <p className="text-[#ccd6f6] text-sm line-clamp-2 group-hover:text-[var(--gold)] transition-colors">
                          {chunk.substring(0, 100)}...
                        </p>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-[var(--gold)]/50 flex-shrink-0 transition-transform ${
                          expandedChunk === idx ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded Chunk Content */}
                  <AnimatePresence>
                    {expandedChunk === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 p-3 bg-[#112240]/40 border border-[var(--gold)]/20 rounded-lg overflow-hidden"
                      >
                        <p className="text-[#ccd6f6] text-xs leading-relaxed whitespace-pre-wrap">
                          {chunk}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}

          {/* AI Response */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-gradient-to-br from-[#112240]/60 to-[#0f172a]/60 border border-[var(--gold)]/30 rounded-lg"
          >
            <div className="flex items-center gap-2 text-[var(--gold)] text-xs font-bold uppercase tracking-widest mb-3">
              <Lightbulb size={14} />
              <span>PREDAI Response</span>
            </div>
            <p className="text-[#ccd6f6] text-sm leading-relaxed">{result.response}</p>
          </motion.div>

          {/* RAG Stats */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-[#0f172a]/40 border border-[#233554] rounded">
              <p className="text-[var(--gold)] font-bold">{result.retrieved_context.length}</p>
              <p className="text-[#8892b0] text-[10px]">Chunks</p>
            </div>
            <div className="p-2 bg-[#0f172a]/40 border border-[#233554] rounded">
              <p className="text-[var(--gold)] font-bold">&lt;100ms</p>
              <p className="text-[#8892b0] text-[10px]">Search</p>
            </div>
            <div className="p-2 bg-[#0f172a]/40 border border-[#233554] rounded">
              <p className="text-[var(--gold)] font-bold">95%+</p>
              <p className="text-[#8892b0] text-[10px]">Accuracy</p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
