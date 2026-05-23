import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Bot } from 'lucide-react';

export default function MessageList({ messages, isStreaming }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-8 text-center bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-primary/10 text-primary">
          <Bot size={32} />
        </div>
        <h2 className="mb-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">How can I help you today?</h2>
        <p className="max-w-md text-slate-500 dark:text-slate-400">
          I'm an AI assistant trained to help with your questions, analysis, and coding tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950" role="log" aria-live="polite" aria-label="Chat messages">
      <div className="max-w-4xl px-4 py-8 mx-auto space-y-6 sm:px-6">
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          return (
            <div 
              key={index} 
              className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div 
                className={`flex items-center justify-center shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                  isUser 
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' 
                    : 'bg-primary/10 text-primary'
                }`}
                aria-hidden="true"
              >
                {isUser ? <User size={20} /> : <Bot size={20} />}
              </div>
              
              <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`px-4 py-3 sm:px-5 sm:py-4 rounded-2xl shadow-sm ${
                    isUser 
                      ? 'bg-slate-900 text-white rounded-tr-sm dark:bg-slate-200 dark:text-slate-900' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className={`prose prose-sm sm:prose-base max-w-none ${
                    isUser 
                      ? 'prose-invert dark:prose-p:text-slate-900' 
                      : 'dark:prose-invert prose-p:leading-relaxed'
                  }`}>
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {isStreaming && (
          <div className="flex gap-4 flex-row">
            <div className="flex items-center justify-center shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 text-primary">
              <Bot size={20} />
            </div>
            <div className="flex items-center px-5 py-4 bg-white border border-slate-200 rounded-2xl rounded-tl-sm shadow-sm dark:bg-slate-900 dark:border-slate-800">
              <div className="flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
