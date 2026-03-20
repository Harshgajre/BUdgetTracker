# Precision Editorial Finance Tracker

A simple responsive finance tracker app with a modern mobile UI, API backend, MongoDB persistence, and PDF export.

## Features
- Add, edit, delete transactions with amount, category, date, description
- Store transactions in MongoDB
- View summary totals and recent transactions
- Toggle dark/light theme with full UI background updates
- Export transaction report as PDF
- API endpoints for CRUD operations

## Tech Stack
- Frontend: HTML, Tailwind CSS, Vanilla JavaScript
- Backend: Node.js, Express
- Database: MongoDB (via Mongoose)
- PDF Export: PDFKit

## Project Structure
```
stitch/
  public/index.html
  server.js
  package.json
  README.md
```

## Prerequisites
- Node.js (>= 18)
- npm
- MongoDB running locally on `mongodb://127.0.0.1:27017`

## Setup
1. Open project directory:
   ```bash
   cd c:\Users\harsh\OneDrive\Desktop\tracker\stitch
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB if not running.

## Run
```bash
node server.js
```

Then open `http://localhost:3000` in your browser.

## Development
For fast reloads, install `nodemon` globally and run:
```bash
npm install -g nodemon
nodemon server.js
```

## API Endpoints
- `GET /api/health` — health check
- `GET /api/transactions` — get all transactions
- `POST /api/transactions` — add transaction
- `PUT /api/transactions/:id` — update transaction
- `DELETE /api/transactions/:id` — delete transaction
- `GET /api/transactions/export/pdf` — download PDF report

### Example Add Transaction Payload
```json
{
  "description": "Lunch with friends",
  "amount": -45,
  "category": "Food & Drinks",
  "date": "2026-03-20"
}
```

## Notes
- Amount determines type (income when >= 0, expense when < 0).
- Currency is shown in INR (₹) in the UI.
- Dark mode now updates all backgrounds and cards consistently.

## Troubleshooting
- If server fails to start, ensure MongoDB is running and `MONGO_URI` is correct.
- If UI doesn't update, refresh browser and confirm console has no JS errors.

## Future Improvements
- Add user authentication
- Add pagination and filters by date/category
- Add CSV export
- Add charts for monthly spend trends
