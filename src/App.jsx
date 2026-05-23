import { useState, useRef, useEffect } from 'react';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import { streamChatCompletion, hasApiKey } from './lib/openai';

function App() {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasClass = document.documentElement.classList.contains('dark');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return hasClass || prefersDark;
    }
    return false;
  });
  const abortControllerRef = useRef(null);

  // Sync dark mode class on html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Clean up AbortController on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSendMessage = async (content) => {
    // Abort any ongoing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    const newUserMessage = { role: 'user', content };
    const newMessages = [...messages, newUserMessage];
    
    setMessages(newMessages);
    setIsStreaming(true);

    try {
      // Add empty assistant message that will be populated
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
      
      await streamChatCompletion(newMessages, (chunk) => {
        if (abortControllerRef.current.signal.aborted) return;
        
        setMessages((prev) => {
          const updatedMessages = [...prev];
          const lastIndex = updatedMessages.length - 1;
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            content: updatedMessages[lastIndex].content + chunk
          };
          return updatedMessages;
        });
      });
    } catch (error) {
      console.error('Streaming error:', error);
      if (error.name !== 'AbortError') {
        const errorMsg = error?.message || error?.error?.message || String(error);
        setMessages((prev) => [
          ...prev, 
          { role: 'assistant', content: `**Error:** ${errorMsg}` }
        ]);
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsStreaming(false);
  };

  const handleReset = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([]);
    setIsStreaming(false);
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-slate-50 dark:bg-slate-950">
      {!hasApiKey && (
        <div className="px-6 py-3 text-sm text-center text-amber-900 bg-amber-50 border-b border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
          <span className="font-medium">⚠ API key missing.</span>{' '}
          Set <code className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900 font-mono text-xs">VITE_FREELLMAPI_KEY</code>
          {' '}in your <code className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900 font-mono text-xs">.env</code> file to enable the AI chat.{' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-amber-700 dark:hover:text-amber-100"
          >
            Get a key
          </a>
        </div>
      )}
      <ChatHeader onReset={handleReset} darkMode={darkMode} onToggleDark={() => setDarkMode(prev => !prev)} />
      <MessageList messages={messages} isStreaming={isStreaming} />
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isStreaming={isStreaming} 
        onStopStream={handleStopStream} 
      />
    </div>
  );
}

export default App;
