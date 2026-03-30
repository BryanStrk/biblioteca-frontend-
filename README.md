# 📚 Biblioteca Frontend

React frontend for the Library Management System, connected to a Spring Boot REST API.

---

## 🧰 Tech Stack

![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-cyan?style=flat&logo=tailwindcss)
![Axios](https://img.shields.io/badge/Axios-1.x-blueviolet?style=flat)
![React Router](https://img.shields.io/badge/React_Router-7-red?style=flat&logo=reactrouter)

---

## 📋 Features

- 📊 **Dashboard** with real-time stats (books, users, active reservations)
- 📖 **Books** — full CRUD with availability status
- 👤 **Users** — full CRUD with registration date
- 🔖 **Reservations** — create, cancel and filter active reservations
- ⚠️ Backend error messages displayed in the UI
- 🎨 Clean sidebar layout with card-based design

---

## 🗂️ Project Structure
```
src/
├── components/
│   ├── Layout.jsx        ← Main layout with sidebar
│   ├── Sidebar.jsx       ← Navigation sidebar
│   └── StatCard.jsx      ← Dashboard stat card component
├── pages/
│   ├── Dashboard.jsx     ← Stats overview
│   ├── Books.jsx         ← Books management
│   ├── Users.jsx         ← Users management
│   └── Reservations.jsx  ← Reservations management
├── services/
│   ├── api.js            ← Axios base instance
│   ├── bookService.js    ← Book API calls
│   ├── userService.js    ← User API calls
│   └── reservationService.js ← Reservation API calls
├── App.jsx               ← Router setup
└── main.jsx              ← Entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Backend running at `http://localhost:8080`

### Setup

**1. Clone the repository**
```bash
git clone https://github.com/BryanStrk/biblioteca-frontend.git
cd biblioteca-frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the application**
```bash
npm run dev
```

Frontend running at: `http://localhost:5173`

> ⚠️ Make sure the backend is running before starting the frontend.

---

## 🔗 API Connection

All API calls point to `http://localhost:8080/api` via Axios.
Configured in `src/services/api.js`:
```js
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})
```

---

## 📡 Services

### `bookService.js`
| Function | Method | Endpoint |
|---|---|---|
| `getBooks()` | GET | `/books` |
| `getAvailableBooks()` | GET | `/books/available` |
| `getBookById(id)` | GET | `/books/{id}` |
| `createBook(data)` | POST | `/books` |
| `updateBook(id, data)` | PUT | `/books/{id}` |
| `deleteBook(id)` | DELETE | `/books/{id}` |

### `userService.js`
| Function | Method | Endpoint |
|---|---|---|
| `getUsers()` | GET | `/users` |
| `getUserById(id)` | GET | `/users/{id}` |
| `createUser(data)` | POST | `/users` |
| `updateUser(id, data)` | PUT | `/users/{id}` |
| `deleteUser(id)` | DELETE | `/users/{id}` |

### `reservationService.js`
| Function | Method | Endpoint |
|---|---|---|
| `getReservations()` | GET | `/reservations` |
| `getActiveReservations()` | GET | `/reservations/active` |
| `getReservationsByUser(userId)` | GET | `/reservations/user/{userId}` |
| `createReservation(userId, bookId)` | POST | `/reservations` |
| `cancelReservation(id)` | PATCH | `/reservations/{id}/cancel` |

---

## 🌿 Branch Strategy
```
main         ← stable production-ready code
└── develop  ← main development branch
    └── feature/frontend-base
```

---

## 📝 Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `chore:` | Config, dependencies |
| `refactor:` | Code restructure |
| `docs:` | Documentation |

---

## 👨‍💻 Author

**Bryan** — DAW Student  
[GitHub](https://github.com/BryanStrk)