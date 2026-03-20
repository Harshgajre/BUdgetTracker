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
    if (amount === undefined || !category || !date) {
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

    // Header
    doc.font('Helvetica-Bold').fontSize(11).text('Date', 50, doc.y, { width: 90 });
    doc.text('Category', 140, doc.y, { width: 120 });
    doc.text('Amount', 260, doc.y, { width: 90, align: 'right' });
    doc.text('Description', 360, doc.y, { width: 180 });
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(10);

    transactions.forEach((t) => {
      const dateStr = new Date(t.date).toLocaleDateString('en-IN');
      const amountStr = `${t.amount < 0 ? '-' : ''}₹${Math.abs(t.amount).toFixed(2)}`;
      doc.text(dateStr, 50, doc.y, { width: 90 });
      doc.text(t.category, 140, doc.y, { width: 120 });
      doc.text(amountStr, 260, doc.y, { width: 90, align: 'right' });
      doc.text(t.description || '-', 360, doc.y, { width: 180 });
      doc.moveDown(0.75);
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: 'Could not generate PDF report.' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

(async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
  } catch (err) {
    console.error('Mongo connection error', err);
    process.exit(1);
  }
})();
