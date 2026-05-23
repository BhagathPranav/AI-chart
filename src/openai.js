import OpenAI from 'openai';

export const openai = new OpenAI({
    baseURL: "http://localhost:3001/v1",  // ← Your FreeLLMAPI proxy
    apiKey: import.meta.env.VITE_FREELLMAPI_KEY || 'dummy-key',
    dangerouslyAllowBrowser: true,
});

export const defaultModel = 'llama-3.3-70b-versatile'; // Or whatever Groq model you want