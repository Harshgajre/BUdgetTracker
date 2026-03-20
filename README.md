# Stitch

A Node.js web application for managing personal finance transactions. Built with Express.js and MongoDB, featuring transaction tracking, editing, deletion, and PDF export capabilities.

## Features

- Add and manage financial transactions
- Edit and delete existing transactions
- View transaction history
- Export transaction data to PDF
- RESTful API with CORS support

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd stitch
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Or start the production server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000` (or the port specified in your environment).

## Dependencies

- **Express** - Web framework for Node.js
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **PDFKit** - PDF generation library

## Project Structure

- `server.js` - Main server file
- `public/` - Static client-side files
  - `index.html` - Main HTML page
  - `app.js` - Client-side JavaScript
- `edit_delete_transaction/` - Transaction editing functionality
- `home_add_transaction/` - Transaction addition functionality
- `transaction_history_export/` - PDF export features
- `equilibrium_finance/` - Finance-related utilities

## API Endpoints

The application provides RESTful API endpoints for transaction management. Refer to `server.js` for detailed endpoint definitions.

## Development

Use `npm run dev` for development with automatic restarts using nodemon.

## License

ISC