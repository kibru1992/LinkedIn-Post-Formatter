import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Linkedin,
  Github,
  Type,
  Bold,
  Italic,
  Code,
  Heading,
  Info
} from 'lucide-react';
import { formatText, FORMAT_TYPES } from './utils/unicodeUtils';
import FormatterCard from './components/FormatterCard';

const iconMap = { Type, Bold, Italic, Heading, Code };
const MAX_LENGTH = 3000;

function App() {
  const [inputText, setInputText] = useState('');
  const [formatType, setFormatType] = useState('normal');
  const [copied, setCopied] = useState(false);

  // Load saved text from chrome storage on mount
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['savedText'], (result) => {
        if (result.savedText) setInputText(result.savedText);
      });
    }
  }, []);

  // Save text to chrome storage on change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ savedText: inputText });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [inputText]);

  const formattedText = formatText(inputText, formatType);
  const charCount = Array.from(inputText).length;
  const progressPercent = Math.min((charCount / MAX_LENGTH) * 100, 100);

  const handleCopy = async () => {
    if (!formattedText) return;
    await navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputText('');
    setFormatType('normal');
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.remove('savedText');
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto overflow-x-hidden selection:bg-primary/30">
      {/* Header with Branding */}
      <motion.header
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="relative mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 bg-gradient-to-tr from-primary to-blue-500 rounded-2xl opacity-20 blur-xl"
          />
          <img
            src="/icons/icon48.png"
            alt="Pro Formatter"
            className="w-16 h-16 rounded-2xl relative border border-white/10 shadow-2xl"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center hidden">
            <Linkedin className="text-white" size={32} />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-slate-800/80 border border-white/5 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 backdrop-blur-md">
          <Sparkles size={10} className="animate-pulse" />
          <span>Professional Grade</span>
        </div>

        <h1 className="text-2xl font-black bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent tracking-tighter">
          LINKEDIN FORMATTER <span className="text-primary italic">PRO</span>
        </h1>
      </motion.header>

      <main className="space-y-4">
        {/* Style Selection */}
        <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-900/50 rounded-2xl border border-white/5 mb-2">
          {FORMAT_TYPES.map((type) => {
            const Icon = iconMap[type.icon];
            const isActive = formatType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setFormatType(type.id)}
                className={`relative flex flex-col items-center justify-center py-2.5 rounded-xl transition-all ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={16} className="relative z-10 mb-1" />
                <span className="relative z-10 text-[9px] font-bold uppercase">{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Card */}
        <FormatterCard title="Original Text" icon={Type}>
          <div className="space-y-3">
            <div className="relative group">
              <textarea
                className="min-h-[180px] w-full bg-slate-900/40 border border-white/5 rounded-xl p-4 text-sm leading-relaxed focus:border-primary/50 transition-colors placeholder:text-slate-700"
                placeholder="Paste your post here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                onClick={handleReset}
                className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800/50 text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
              >
                <RefreshCw size={14} />
              </button>
            </div>

            <div className="flex items-center gap-3 px-1">
              <div className="flex-grow h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className={`h-full ${charCount > MAX_LENGTH ? 'bg-red-500' : 'bg-primary'}`}
                />
              </div>
              <span className={`text-[10px] font-mono min-w-[60px] text-right ${charCount > MAX_LENGTH ? 'text-red-400 font-bold' : 'text-slate-500'}`}>
                {charCount}/{MAX_LENGTH}
              </span>
            </div>
          </div>
        </FormatterCard>

        {/* Preview & Export */}
        <FormatterCard title="Instant Preview" icon={Linkedin}>
          <div className="space-y-3">
            <div className="glass-card bg-slate-950/40 p-4 rounded-xl border-dashed border-white/10 min-h-[120px] max-h-[250px] overflow-y-auto whitespace-pre-wrap text-[15px] leading-relaxed text-slate-200">
              {formattedText || (
                <div className="flex flex-col items-center justify-center h-24 text-slate-600 space-y-2 opacity-50">
                  <Info size={20} />
                  <span className="text-xs">Formatted text will appear here...</span>
                </div>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleCopy}
              disabled={!formattedText}
              className={`primary-button w-full justify-center py-4 rounded-xl text-sm ${copied ? 'bg-green-600 pulse-success' : ''
                } ${!formattedText && 'opacity-30 grayscale cursor-not-allowed'}`}
            >
              <AnimatePresence mode='wait'>
                {copied ? (
                  <motion.div
                    key="checked"
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={18} strokeWidth={3} />
                    Ready to Paste!
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Copy size={18} />
                    Copy Formatted Text
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </FormatterCard>
      </main>

      <footer className="mt-8 mb-4">
        <div className="flex items-center justify-between text-[10px] text-slate-600 px-2 font-medium">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            V1.0.0 PRO
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-primary transition-colors">HELP</a>
            <a href="#" className="hover:text-primary transition-colors">SUPPORT</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
