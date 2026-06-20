const db = require('../config/db');

const getExpenses = async (req, res) => {
  try {
    const [expenses] = await db.query(
      'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC',
      [req.user.id]
    );
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const addExpense = async (req, res) => {
  const { title, amount, category, date, notes } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO expenses (user_id, title, amount, category, date, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, title, amount, category, date, notes]
    );
    res.status(201).json({ message: 'Expense added', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateExpense = async (req, res) => {
  const { title, amount, category, date, notes } = req.body;
  try {
    const [expense] = await db.query(
      'SELECT * FROM expenses WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (expense.length === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    await db.query(
      'UPDATE expenses SET title=?, amount=?, category=?, date=?, notes=? WHERE id=?',
      [title, amount, category, date, notes, req.params.id]
    );
    res.json({ message: 'Expense updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const [expense] = await db.query(
      'SELECT * FROM expenses WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (expense.length === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    await db.query('DELETE FROM expenses WHERE id = ?', [req.params.id]);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getSummary = async (req, res) => {
  try {
    const [total] = await db.query(
      'SELECT SUM(amount) as total FROM expenses WHERE user_id = ?',
      [req.user.id]
    );
    const [byCategory] = await db.query(
      'SELECT category, SUM(amount) as total FROM expenses WHERE user_id = ? GROUP BY category',
      [req.user.id]
    );
    const [byMonth] = await db.query(
      `SELECT DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as total 
       FROM expenses WHERE user_id = ? 
       GROUP BY month ORDER BY month DESC LIMIT 6`,
      [req.user.id]
    );
    res.json({ total: total[0].total || 0, byCategory, byMonth });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getExpenses, addExpense, updateExpense, deleteExpense, getSummary };