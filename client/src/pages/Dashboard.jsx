import { useState, useEffect } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ total: 0, byCategory: [], byMonth: [] });
  const [editData, setEditData] = useState(null);

  const fetchExpenses = async () => {
    try {
      const { data } = await API.get('/expenses');
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSummary = async () => {
    try {
      const { data } = await API.get('/expenses/summary');
      setSummary(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const handleRefresh = () => {
    fetchExpenses();
    fetchSummary();
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Total Spent</p>
            <p className="text-white text-3xl font-bold">₹{Number(summary.total).toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Total Transactions</p>
            <p className="text-white text-3xl font-bold">{expenses.length}</p>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Top Category</p>
            <p className="text-white text-3xl font-bold">
              {summary.byCategory[0]?.category || '—'}
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ExpenseForm
              onExpenseAdded={handleRefresh}
              editData={editData}
              onEditDone={() => { setEditData(null); handleRefresh(); }}
            />

            {/* Category Breakdown */}
            {summary.byCategory.length > 0 && (
              <div className="bg-gray-900 rounded-2xl p-6 mt-6">
                <h3 className="text-white font-bold text-lg mb-4">By Category</h3>
                <div className="space-y-2">
                  {summary.byCategory.map((cat) => (
                    <div key={cat.category} className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">{cat.category}</span>
                      <span className="text-white font-medium text-sm">
                        ₹{Number(cat.total).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <ExpenseList
              expenses={expenses}
              onDelete={handleRefresh}
              onEdit={(exp) => setEditData(exp)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}