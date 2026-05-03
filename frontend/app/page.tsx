import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import RAGShowcase from "@/components/RAGShowcase";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <RAGShowcase />
      <Chatbot />
      
      {/* Simple Footer */}
      <footer className="py-10 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Purendeeswar Reddy Mure. Built with Next.js & Gemini AI.</p>
      </footer>
    </main>
  );
}
