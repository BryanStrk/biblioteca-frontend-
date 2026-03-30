    import { useEffect, useState } from 'react'
    import StatCard from '../components/StatCard'
    import { getBooks, getAvailableBooks } from '../services/bookService'
    import { getUsers } from '../services/userService'
    import { getActiveReservations } from '../services/reservationService'

    export default function Dashboard() {
    const [stats, setStats] = useState({
        totalBooks: 0,
        availableBooks: 0,
        totalUsers: 0,
        activeReservations: 0,
    })

    useEffect(() => {
        Promise.all([
        getBooks(),
        getAvailableBooks(),
        getUsers(),
        getActiveReservations(),
        ]).then(([books, available, users, reservations]) => {
        setStats({
            totalBooks: books.data.length,
            availableBooks: available.data.length,
            totalUsers: users.data.length,
            activeReservations: reservations.data.length,
        })
        })
    }, [])

    return (
        <div>
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
            Welcome to Library Management System
            </p>
        </div>

        {/* Hero Banner */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-8 flex items-center justify-between">
            <div>
            <h2 className="text-2xl font-bold text-white mb-2">
                Manage Your Library
            </h2>
            <p className="text-gray-400 text-sm max-w-sm">
                Keep track of books, users and reservations all in one place.
            </p>
            </div>
            <span className="text-6xl">📚</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
            icon="📚"
            title="Total Books"
            value={stats.totalBooks}
            subtitle="In the system"
            />
            <StatCard
            icon="✅"
            title="Available Books"
            value={stats.availableBooks}
            subtitle="Ready to reserve"
            />
            <StatCard
            icon="👤"
            title="Total Users"
            value={stats.totalUsers}
            subtitle="Registered users"
            />
            <StatCard
            icon="🔖"
            title="Active Reservations"
            value={stats.activeReservations}
            subtitle="Currently active"
            />
        </div>
        </div>
    )
    }