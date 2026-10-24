"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Sliders, X, RotateCcw, Copy, Check } from "lucide-react";

export interface GradientSetting {
  angle: number;
  spread: number;
  cornerColor: string;
  mainColor: string;
}

export interface GradientContextType {
  blue: GradientSetting;
  red: GradientSetting;
  setBlue: React.Dispatch<React.SetStateAction<GradientSetting>>;
  setRed: React.Dispatch<React.SetStateAction<GradientSetting>>;
  resetDefaults: () => void;
}

// Light, soft, refined pastel defaults requested by user:
// red: linear-gradient(220deg, #fdfcfc 0%, #fef1f1 80%)
// blue: linear-gradient(220deg, #f6f9fe 0%, #ecf5fe 80%)
const DEFAULT_BLUE: GradientSetting = {
  angle: 220,
  spread: 80,
  cornerColor: "#f6f9fe",
  mainColor: "#ecf5fe",
};

const DEFAULT_RED: GradientSetting = {
  angle: 220,
  spread: 80,
  cornerColor: "#fdfcfc",
  mainColor: "#fef1f1",
};

const GradientContext = createContext<GradientContextType>({
  blue: DEFAULT_BLUE,
  red: DEFAULT_RED,
  setBlue: () => {},
  setRed: () => {},
  resetDefaults: () => {},
});

export function GradientProvider({ children }: { children: React.ReactNode }) {
  const [blue, setBlue] = useState<GradientSetting>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bhive_gradient_blue_v2");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return DEFAULT_BLUE;
  });

  const [red, setRed] = useState<GradientSetting>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bhive_gradient_red_v2");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return DEFAULT_RED;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bhive_gradient_blue_v2", JSON.stringify(blue));
    }
  }, [blue]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bhive_gradient_red_v2", JSON.stringify(red));
    }
  }, [red]);

  const resetDefaults = () => {
    setBlue(DEFAULT_BLUE);
    setRed(DEFAULT_RED);
    if (typeof window !== "undefined") {
      localStorage.removeItem("bhive_gradient_blue_v2");
      localStorage.removeItem("bhive_gradient_red_v2");
    }
  };

  return (
    <GradientContext.Provider value={{ blue, red, setBlue, setRed, resetDefaults }}>
      {children}
      <GradientControlsPanel />
    </GradientContext.Provider>
  );
}

export function useGradientSettings() {
  return useContext(GradientContext);
}

export function GradientControlsPanel() {
  const { blue, red, setBlue, setRed, resetDefaults } = useGradientSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"red" | "blue">("red");
  const [copied, setCopied] = useState(false);

  const active = activeTab === "red" ? red : blue;
  const setActive = activeTab === "red" ? setRed : setBlue;

  const currentCss = `linear-gradient(${active.angle}deg, ${active.cornerColor} 0%, ${active.mainColor} ${active.spread}%)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 print:hidden font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 text-white shadow-lg backdrop-blur-md text-xs sm:text-sm font-medium hover:bg-slate-900 transition-all hover:scale-105 active:scale-95"
          title="Open gradient angle & spread controls"
        >
          <Sliders className="h-4 w-4" />
          <span>Gradient Controls</span>
        </button>
      ) : (
        <div className="w-[320px] sm:w-[350px] rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-2xl p-5 text-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-600" />
              <h4 className="text-sm font-semibold text-slate-900">Gradient Handlers</h4>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetDefaults}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Reset to light defaults"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-1.5 my-3.5 p-1 bg-slate-100 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab("red")}
              className={`py-1.5 rounded-lg transition-all ${
                activeTab === "red" ? "bg-white text-rose-700 shadow-xs font-semibold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Problems (Red)
            </button>
            <button
              onClick={() => setActiveTab("blue")}
              className={`py-1.5 rounded-lg transition-all ${
                activeTab === "blue" ? "bg-white text-blue-700 shadow-xs font-semibold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Results (Blue)
            </button>
          </div>

          {/* Preview Swatch */}
          <div
            className="w-full h-12 rounded-xl mb-4 shadow-inner flex items-center justify-center text-[11px] font-mono font-medium text-slate-800/70"
            style={{ background: currentCss }}
          >
            Live Preview
          </div>

          {/* Controls Form */}
          <div className="space-y-4 text-xs">
            {/* Angle Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-medium text-slate-700">Gradient Angle</span>
                <span className="font-mono text-slate-500 font-semibold">{active.angle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={active.angle}
                onChange={(e) => setActive((prev) => ({ ...prev, angle: Number(e.target.value) }))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0°</span>
                <span>90°</span>
                <span>180°</span>
                <span>220° (default)</span>
                <span>360°</span>
              </div>
            </div>

            {/* Spread Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-medium text-slate-700">Gradient Spread</span>
                <span className="font-mono text-slate-500 font-semibold">{active.spread}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="1"
                value={active.spread}
                onChange={(e) => setActive((prev) => ({ ...prev, spread: Number(e.target.value) }))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>20% (sharp)</span>
                <span>65% (soft)</span>
                <span>100% (wide)</span>
              </div>
            </div>

            {/* Color Inputs */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Corner (Light)</label>
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1.5">
                  <input
                    type="color"
                    value={active.cornerColor}
                    onChange={(e) => setActive((prev) => ({ ...prev, cornerColor: e.target.value }))}
                    className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={active.cornerColor}
                    onChange={(e) => setActive((prev) => ({ ...prev, cornerColor: e.target.value }))}
                    className="w-full bg-transparent font-mono text-[11px] text-slate-700 outline-none uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Body (Base)</label>
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1.5">
                  <input
                    type="color"
                    value={active.mainColor}
                    onChange={(e) => setActive((prev) => ({ ...prev, mainColor: e.target.value }))}
                    className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={active.mainColor}
                    onChange={(e) => setActive((prev) => ({ ...prev, mainColor: e.target.value }))}
                    className="w-full bg-transparent font-mono text-[11px] text-slate-700 outline-none uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Code Output / Copy */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] text-slate-500 truncate max-w-[210px]" title={currentCss}>
              {currentCss}
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] transition-colors shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
