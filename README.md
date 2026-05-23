# Pranav's AI

A personal AI chatbot that acts as a digital clone of **Bhagath Pranav Kumar**. It responds conversationally in Pranav's voice, using his personality, background, and preferences to give authentic, human-like answers.

## ✨ Features

- **AI Personality Clone** — Custom system prompt that mirrors Pranav's tone, humor, and life experiences
- **Real-time Streaming** — Responses stream in token-by-token for a smooth, interactive feel
- **Markdown Rendering** — AI responses support full Markdown (headings, code blocks, lists, bold/italic)
- **Dark / Light Mode** — Toggle between themes with a single click; auto-detects system preference
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- **Conversation Reset** — Clear the chat and start fresh anytime
- **Stop Generation** — Abort an in-progress AI response mid-stream

## 🛠 Tech Stack

| Layer       | Technology                                                                 |
| ----------- | -------------------------------------------------------------------------- |
| Framework   | [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)              |
| Styling     | [Tailwind CSS 4](https://tailwindcss.com/)                                |
| AI Backend  | [FreeLLMAPI](https://github.com/tashfeenahmed/freellmapi) (OpenAI-compatible proxy) |
| LLM Model   | `llama-3.3-70b-versatile` via Groq                                        |
| AI SDK      | [openai](https://www.npmjs.com/package/openai) (Node/browser client)      |
| Icons       | [Lucide React](https://lucide.dev/)                                       |
| Markdown    | [react-markdown](https://github.com/remarkjs/react-markdown)              |

## 📁 Project Structure

```
AI-chart/
├── index.html                  # App entry point
├── .env                        # API key (VITE_FREELLMAPI_KEY)
├── vite.config.js              # Vite configuration
├── package.json
├── src/
│   ├── main.jsx                # React root mount
│   ├── App.jsx                 # Main app — state, streaming, dark mode
│   ├── index.css               # Global styles
│   ├── lib/
│   │   └── openai.js           # AI client, system prompt, streaming logic
│   └── components/
│       ├── ChatHeader.jsx      # Header with title, dark mode toggle, reset
│       ├── ChatInput.jsx       # Auto-resizing textarea with send/stop buttons
│       └── MessageList.jsx     # Message bubbles with Markdown + typing indicator
└── public/
    └── favicon.svg
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **FreeLLMAPI** server running locally on `http://localhost:3001`

### Installation

```bash
# Clone the repository
git clone https://github.com/Munna4171/sql-learning-repo.git
cd AI-chart

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the project root:

```env
VITE_FREELLMAPI_KEY=your_freellmapi_key_here
```

Get your unified key from the FreeLLMAPI dashboard after adding your provider API keys (e.g., Groq, Gemini, Mistral).

### Run

```bash
# Make sure FreeLLMAPI is running on port 3001 first
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📜 Available Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR |
| `npm run build`   | Build for production               |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint                         |

## 🔧 Customization

### Change the AI personality

Edit the `systemInstruction` in [`src/lib/openai.js`](src/lib/openai.js) to update the identity, background, personality traits, and tone of the AI clone.

### Switch LLM model

Change `defaultModel` in [`src/lib/openai.js`](src/lib/openai.js):

```js
export const defaultModel = 'llama-3.3-70b-versatile'; // or any model your FreeLLMAPI supports
```

### Use a different API provider

Update the `baseURL` in the OpenAI client initialization in [`src/lib/openai.js`](src/lib/openai.js) to point to any OpenAI-compatible endpoint (Groq, Together, OpenRouter, etc.).

## 📄 License

This project is private and intended for personal use.

---

Built with ☕ by **Bhagath Pranav Kumar**
