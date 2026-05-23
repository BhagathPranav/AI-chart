import { Bot, RefreshCcw, Moon, Sun } from 'lucide-react';

export default function ChatHeader({ onReset, darkMode, onToggleDark }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary" aria-hidden="true">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Pranav's AI</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Powered by Google Gemini</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleDark}
          className="flex items-center justify-center w-9 h-9 transition-colors rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
          title="Reset Conversation"
          aria-label="Reset conversation"
        >
          <RefreshCcw size={16} />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </header>
  );
}
