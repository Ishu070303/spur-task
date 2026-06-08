# Spur Chat — AI Live Support Widget

A full-stack AI customer support chat widget built for the Spur founding engineer take-home assignment. Users can chat with an AI support agent for **Nova Store**, a fictional e-commerce store — asking about returns, shipping, support hours, and more.

**Live Demo:** https://spur-task-ten.vercel.app  
**Backend API:** https://spur-chat-backend-b6o8.onrender.com

---

## Running Locally

### Prerequisites
- Node.js 18+
- npm
- An Anthropic API key from [console.anthropic.com](https://console.anthropic.com)

### 1. Clone the repo

```bash
git clone https://github.com/Ishu070303/spur-task.git
cd spur-task
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:
```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3000
DATABASE_URL=./data.db
```

```bash
npm run dev
```

The SQLite database is created automatically on first run — no migrations needed. The schema initialises `conversations` and `messages` tables on startup using `IF NOT EXISTS` guards.

### 3. Frontend

Open a new terminal tab:

```bash
cd frontend
npm install
cp .env.example .env
```

`.env`:
```
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

Open **http://localhost:5173** and click the chat button in the bottom right corner.

---

## Architecture Overview

### Backend

```
Request
  → Zod validation middleware
  → Controller (req/res)
  → Service (business logic)
  → Repository (DB queries)
  → LLM Service (Anthropic API)
```

Four clear layers with strict separation of concerns:

- `routes/` — endpoint declarations only, no logic
- `controllers/` — request/response handling and input validation
- `services/` — orchestrates DB and LLM calls, all business logic lives here
- `repositories/` — pure SQLite queries, no business logic

**Key design decisions:**

- **SQLite + better-sqlite3** — zero infra, auto-created on startup. The repository pattern means swapping to PostgreSQL later only touches the repository layer, nothing else.
- **Channel-agnostic service layer** — adding WhatsApp or Instagram means new route files calling the same `ChatService`. The persistence and LLM layers stay completely unchanged.
- **LLM fully encapsulated** — swapping providers (OpenAI, Gemini) means editing only `llm.service.ts`, nothing else in the codebase changes.
- **Session-based conversations** — UUID sessionId stored in localStorage ties messages together without requiring auth.

### Frontend

Atomic design structure:

```
components/atoms/       # MessageBubble, TypingIndicator, SendButton, ErrorBanner
components/molecules/   # MessageInput, ChatHeader
components/organisms/   # MessageList, ChatWindow
pages/       # ChatPage (widget shell + fake Nova Store landing page)
hooks/       # useChat — single source of truth for all state and API calls
services/    # api.ts — axios wrapper around backend endpoints
```

The `useChat` hook owns all state, session management, and API calls. Components are purely presentational with no business logic.

---

## LLM Notes

**Provider:** Anthropic Claude (`claude-sonnet-4-6`)

**Prompting approach:**

The system prompt is defined in `backend/src/services/llm.service.ts` and includes:
- Shipping policy — 5-7 days domestic, 10-14 days international, free above ₹999
- Return policy — 7 day window, unused items in original packaging only
- Support hours — Monday to Saturday, 10AM–6PM IST
- Behaviour rules — stay on topic, never fabricate information outside the provided context

The last 10 messages are passed as conversation history on every request so follow-up questions have full context.

**Error handling:**

| Error | User-facing message |
|---|---|
| 429 Rate limit | "We are currently experiencing high traffic. Please try again in a moment." |
| 401 Auth failure | "There is a configuration issue on our end. Please contact support." |
| Timeout | "The request timed out. Please try again." |
| Everything else | "Something went wrong on our end. Please try again shortly." |

All errors return friendly messages — the backend never crashes or exposes raw error details to the client.

---

## Trade-offs & If I Had More Time

**Trade-offs made:**

- **SQLite over PostgreSQL** — removes infra complexity for this exercise. The repository pattern makes it a clean swap when scaling up.
- **Hardcoded FAQ in system prompt** — simple and reliable for a fixed policy set. A real product would store this in the DB so merchants can edit it without a redeploy.
- **History window capped at 10 messages** — keeps token costs predictable. Very long conversations lose early context but this is acceptable for a support use case.
- **No auth** — sessionId in localStorage is simple but not secure. A real product needs proper user identity.

**If I had more time:**

- **Streaming responses** — show the AI reply word by word as it generates instead of waiting for the full response
- **Merchant admin panel** — let store owners edit their FAQ, policies, and agent tone from a dashboard stored in DB
- **WebSocket support** — replace HTTP request/response with a persistent connection for a truly real-time feel
- **WhatsApp/Instagram channels** — the architecture already supports it, just needs webhook route handlers calling the same `ChatService`
- **Rate limiting per session** — prevent abuse by capping requests per sessionId on the backend
- **Conversation analytics** — track common questions, unanswered queries, and satisfaction signals for the store owner
