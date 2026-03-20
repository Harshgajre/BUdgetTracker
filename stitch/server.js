const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/precision-editorial';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const transactionSchema = new mongoose.Schema({
  description: { type: String, default: '' },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['expense', 'income'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1, createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch transactions.' });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    if (!amount || !category || !date) {
      return res.status(400).json({ error: 'amount, category and date are required.' });
    }
    const t = new Transaction({
      description,
      amount: Number(amount),
      category,
      date: new Date(date),
      type: Number(amount) >= 0 ? 'income' : 'expense',
    });
    await t.save();
    res.json(t);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to create transaction.' });
  }
});

app.put('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category, date } = req.body;
    const updated = await Transaction.findByIdAndUpdate(
      id,
      {
        description,
        amount: Number(amount),
        category,
        date: new Date(date),
        type: Number(amount) >= 0 ? 'income' : 'expense',
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Transaction not found.' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to update transaction.' });
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Transaction.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ error: 'Transaction not found.' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to delete transaction.' });
  }
});

app.get('/api/transactions/export/pdf', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1, createdAt: -1 });
    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=transactions-report.pdf');
    doc.pipe(res);

    doc.font('Helvetica-Bold').fontSize(20).text('Transaction Report', { align: 'center' });
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(12).text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(1);

    const lines = [['Date', 'Category', 'Amount', 'Description']];
    transactions.forEach((t) => {
      const dateStr = new Date(t.date).toLocaleDateString();
      const amountStr = `${t.amount < 0 ? '-' : ''}$${Math.abs(t.amount).toFixed(2)}`;
      lines.push([dateStr, t.category, amountStr, t.description || '-']);
    });

    const tableTop = doc.y + 10;
    const colX = [50, 150, 300, 390];
    doc.font('Helvetica-Bold').fontSize(11);
    lines[0].forEach((cell, i) => doc.text(cell, colX[i], tableTop));
    doc.moveDown(1);

    doc.font('Helvetica').fontSize(10);
    lines.slice(1).forEach((row, rowIndex) => {
      const y = tableTop + 20 + rowIndex * 20;
      row.forEach((cell, i) => {
        doc.text(cell.toString(), colX[i], y, { width: i === 3 ? 150 : 120 });
      });
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not generate PDF report.' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
  } catch (err) {
    console.error('Mongo connection error', err);
    process.exit(1);
  }
}

startServer();
