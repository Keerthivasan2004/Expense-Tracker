import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl">💰</span>
        <span className="text-white font-bold text-xl">ExpenseTracker</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm">Hi, {user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}