# Project knowledge

This file gives Codebuff context about your project: goals, commands, conventions, and gotchas.

## Project Overview

**AI-chart** — A React + Vite AI chat interface (Pranav's AI Clone) powered by Google Gemini API. Users chat with an AI clone that responds as the developer's persona.

## Quickstart

- **Setup:** `npm install`
- **Dev:** `npm run dev` (starts Vite dev server, usually on port 5173)
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Lint:** `npm run lint`

## Architecture

- **Entry:** `index.html` → `src/main.jsx`
- **Root component:** `src/App.jsx` — manages messages state, streaming, and orchestrates the chat flow
- **Components:** `src/components/`
  - `ChatHeader.jsx` — top bar with app title and reset button
  - `MessageList.jsx` — renders message bubbles (user + assistant) with markdown support
  - `ChatInput.jsx` — textarea input with send/stop buttons
- **API:** `src/lib/openai.js` — Google Gemini streaming client using `@google/genai` SDK
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"`) + `@tailwindcss/typography` for markdown prose styling
- **Icons:** `lucide-react`

## Key Dependencies

- React 19, Vite 8, Tailwind CSS 4
- Google GenAI SDK (`@google/genai`) — Gemini API calls
- `react-markdown` — renders AI responses with markdown

## Environment Variables

- `VITE_GOOGLE_API_KEY` — required in `.env` for Google Gemini API access

## Conventions

- **Formatting/linting:** ESLint (flat config, `eslint.config.js`)
- **Styling:** Tailwind utility classes throughout; custom theme colors in `src/index.css`
- **Dark mode:** Uses Tailwind's `dark:` variant classes; default system preference
- **Components:** Functional components with default exports; props destructured
- **API calls:** Streaming via `streamChatCompletion()` in `src/lib/openai.js` — sends user messages, returns chunks to update UI

## Gotchas

- The project uses Vite's `import.meta.env.VITE_*` for env vars; a `.env` file with `VITE_GOOGLE_API_KEY` is required for the chat to work
- The AI system prompt (defining the "clone" persona) is hardcoded in `src/lib/openai.js` — any persona changes must be made there
- Gemini uses `'model'` role (not `'assistant'`) — the conversion happens in `streamChatCompletion()`
- No TypeScript — this is a JSX project
- No test framework configured; no testing scripts available
