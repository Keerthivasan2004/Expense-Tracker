import { useState } from 'react';
import API from '../api/axios';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Education', 'Bills', 'Other'];

export default function ExpenseForm({ onExpenseAdded, editData, onEditDone }) {
  const [form, setForm] = useState({
    title: editData?.title || '',
    amount: editData?.amount || '',
    category: editData?.category || 'Food',
    date: editData?.date?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    notes: editData?.notes || '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await API.put(`/expenses/${editData.id}`, form);
        onEditDone();
      } else {
        await API.post('/expenses', form);
        onExpenseAdded();
      }
      setForm({ title: '', amount: '', category: 'Food', date: new Date().toISOString().slice(0, 10), notes: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-6">
      <h3 className="text-white font-bold text-lg mb-4">
        {editData ? '✏️ Edit Expense' : '➕ Add Expense'}
      </h3>
      {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title (e.g. Lunch)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          required
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          required
          min="0"
          step="0.01"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          required
        />
        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
          rows={2}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold text-sm transition"
          >
            {editData ? 'Update' : 'Add Expense'}
          </button>
          {editData && (
            <button
              type="button"
              onClick={onEditDone}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold text-sm transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}