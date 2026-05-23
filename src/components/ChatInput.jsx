import { useState, useRef, useEffect } from 'react';
import { Send, StopCircle } from 'lucide-react';

export default function ChatInput({ onSendMessage, isStreaming, onStopStream }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isStreaming) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-white border-t sm:p-6 border-slate-200 dark:bg-slate-900 dark:border-slate-800 shrink-0">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-end w-full max-w-4xl mx-auto overflow-hidden bg-white border rounded-2xl border-slate-300 dark:bg-slate-800 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary/50 transition-all shadow-sm"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AI... (Shift+Enter for new line)"
          className="w-full max-h-[200px] py-4 pl-4 pr-14 bg-transparent border-none resize-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          rows={1}
          disabled={isStreaming}
          aria-label="Chat input"
        />
        <div className="absolute right-2 bottom-2">
          {isStreaming ? (
            <button
              type="button"
              onClick={onStopStream}
              className="flex items-center justify-center w-10 h-10 transition-colors rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-400 hover:text-red-500"
            >
              <StopCircle size={20} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex items-center justify-center w-10 h-10 transition-all rounded-full bg-primary text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-500"
            >
              <Send size={18} className="ml-0.5" />
            </button>
          )}
        </div>
      </form>
      <div className="mt-2 text-xs text-center text-slate-500 dark:text-slate-500">
        AI can make mistakes. Consider verifying important information.
      </div>
    </div>
  );
}
