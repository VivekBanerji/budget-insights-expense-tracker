# Budget Insights API

Express API starter. See `.env.example` for configuration. Run `npm install`, copy `.env.example` to `.env`, then `npm run dev`.

Endpoints: `GET /api/health`, `GET/POST/DELETE /api/transactions`, `POST /api/ai/receipt`, `POST /api/ai/coach`.

Security note: do not expose `OPENAI_API_KEY` in client code. Configure authentication and per-user authorization before using real financial data. The fallback transaction store is in-memory and is not durable.
