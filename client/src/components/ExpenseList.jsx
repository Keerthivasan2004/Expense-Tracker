import API from '../api/axios';

const CATEGORY_COLORS = {
  Food: 'bg-orange-500/20 text-orange-400',
  Transport: 'bg-blue-500/20 text-blue-400',
  Shopping: 'bg-pink-500/20 text-pink-400',
  Entertainment: 'bg-purple-500/20 text-purple-400',
  Health: 'bg-green-500/20 text-green-400',
  Education: 'bg-yellow-500/20 text-yellow-400',
  Bills: 'bg-red-500/20 text-red-400',
  Other: 'bg-gray-500/20 text-gray-400',
};

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await API.delete(`/expenses/${id}`);
      onDelete();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        <p className="text-4xl mb-3">📭</p>
        <p className="text-gray-400">No expenses yet. Add your first one!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6">
      <h3 className="text-white font-bold text-lg mb-4">Recent Expenses</h3>
      <div className="space-y-3">
        {expenses.map((exp) => (
          <div key={exp.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${CATEGORY_COLORS[exp.category] || CATEGORY_COLORS.Other}`}>
                {exp.category}
              </span>
              <div>
                <p className="text-white font-medium text-sm">{exp.title}</p>
                <p className="text-gray-500 text-xs">{new Date(exp.date).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white font-bold">₹{Number(exp.amount).toLocaleString('en-IN')}</span>
              <button
                onClick={() => onEdit(exp)}
                className="text-indigo-400 hover:text-indigo-300 text-xs transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="text-red-400 hover:text-red-300 text-xs transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}