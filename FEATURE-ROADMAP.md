# Budget Insights: new feature pack

## Included in this starter
- Spending calendar with daily income/expense detail and four spending-intensity colors.
- Loans & EMIs page; loans are stored locally and can be paused/resumed/deleted. It does not falsely mark scheduled EMIs as paid.
- Bill scanner review flow; upload a receipt, review/edit its details, and confirm adding an expense. The current frontend category suggestion uses the filename only; it is not OCR.
- Money coach with goal/monthly savings calculator and local spending summaries. This is rules-based demo logic, not a live AI model.
- Express backend starter with transaction CRUD endpoints and optional OpenAI receipt-extraction/coach endpoints.
- Optional MongoDB connection; if no MongoDB URI is configured, transaction API uses temporary in-memory storage.

## Run frontend
From the project root:
```bash
npm install
npm run dev
```

## Run backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```
Edit `server/.env` to configure MongoDB and optionally `OPENAI_API_KEY`. Never place the AI key in the frontend. Without a key, AI endpoints return 503 and the frontend demo remains usable.

## Important integration status
The frontend currently keeps its transaction/loan state in browser localStorage. The Express API is provided as a starter and is not yet wired into every frontend operation. For production, add authentication, per-user data isolation, validation/rate limiting, secure receipt storage, database-backed loan/budget/profile CRUD, recurring payment generation with idempotency, and tests. Do not treat an EMI schedule as a paid transaction; record payment only after confirmation.

## Receipt scanner status
The current frontend does not perform OCR automatically. It accepts an image/PDF and gives the user a manual review form. The backend `/api/ai/receipt` endpoint accepts a base64 image and returns structured AI extraction when an API key is configured; connect this endpoint to the UI and convert supported image files to data URLs to enable real extraction. PDFs require rendering to images or a separate PDF extraction path.

## Calendar assumptions
Calendar color bands use a demo daily target of ₹1,000. Replace this with an actual plan-derived target per day before relying on the color as a financial warning.
