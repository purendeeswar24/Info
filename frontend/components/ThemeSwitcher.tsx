"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("default");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "default";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme: string) => {
    const root = document.documentElement;
    if (selectedTheme === "default") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", selectedTheme);
    }
    localStorage.setItem("theme", selectedTheme);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };

  const themes = [
    { id: "default", name: "Gold", color: "#c5a021" },
    { id: "emerald", name: "Emerald", color: "#10b981" },
    { id: "ruby", name: "Ruby", color: "#e11d48" },
    { id: "cyan", name: "Cyan", color: "#06b6d4" },
  ];

  return (
    <div className="fixed top-10 right-10 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[var(--gold)] text-[#020c1b] flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
      >
        <Palette size={24} />
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 bg-[#112240] border border-[#233554] rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
          <p className="text-xs uppercase font-bold text-[#8892b0] mb-4 tracking-widest px-2">
            Select Theme
          </p>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                  theme === t.id
                    ? "bg-[var(--gold)] text-[#020c1b] shadow-lg"
                    : "bg-[#020c1b] text-[#ccd6f6] border border-[#233554] hover:border-[var(--gold)]"
                }`}
                style={theme === t.id ? {} : { borderColor: t.color + "50" }}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
