# 💰 Expense Tracker

A full-stack expense tracking web application built with React, Node.js, Express, and MySQL — deployed on Vercel and Railway.

🔗 **Live Demo:** [expense-tracker-gules-sigma-14.vercel.app](https://expense-tracker-gules-sigma-14.vercel.app)

---

## 📸 Screenshots

> Dashboard showing expense summary, recent transactions, and add expense form.

---

## ✨ Features

- **JWT Authentication** — Secure register and login with token-based auth
- **Add / Edit / Delete Expenses** — Full CRUD operations
- **Category Tagging** — Organize expenses by Food, Transport, Entertainment, etc.
- **Summary Stats** — Total spent, total transactions, and top spending category
- **Responsive UI** — Clean dark-themed interface built with Tailwind CSS
- **Persistent Storage** — All data stored in MySQL, survives page refreshes

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Axios, React Router |
| Backend | Node.js, Express.js |
| Database | MySQL (Railway) |
| Authentication | JWT (JSON Web Tokens), bcrypt |
| Deployment | Vercel (frontend), Railway (backend + DB) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MySQL (local or Railway)

### 1. Clone the repository

```bash
git clone https://github.com/Keerthivasan2004/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_PORT=3306
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:

```bash
npm start
```

### 3. Set up the frontend

```bash
cd ../client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 📁 Project Structure

```
Expense-Tracker/
├── client/                  # React frontend
│   ├── src/
│   │   ├── api/             # Axios instance
│   │   ├── components/      # ExpenseForm, ExpenseList, Navbar
│   │   └── pages/           # Dashboard, Login, Register
│   └── vercel.json          # Vercel routing config
│
└── server/                  # Node.js backend
    ├── config/
    │   └── db.js            # MySQL connection + auto table init
    ├── controllers/         # Route logic
    ├── middleware/          # JWT auth middleware
    ├── routes/              # API route definitions
    └── index.js             # Express app entry point
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login and get JWT token | ❌ |
| GET | `/api/expenses` | Get all expenses for user | ✅ |
| POST | `/api/expenses` | Add a new expense | ✅ |
| PUT | `/api/expenses/:id` | Update an expense | ✅ |
| DELETE | `/api/expenses/:id` | Delete an expense | ✅ |
| GET | `/api/expenses/summary` | Get total stats | ✅ |

---

## 🌐 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com) with automatic GitHub integration
- **Backend + MySQL** deployed on [Railway](https://railway.app)
- Database tables are auto-created on server startup via `db.js`

---

## 👤 Author

**Keerthivasan** — [GitHub](https://github.com/Keerthivasan2004)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).