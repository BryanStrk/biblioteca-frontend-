    import { NavLink } from 'react-router-dom'

    const links = [
    { to: '/', label: 'Dashboard', icon: '📊' },
    { to: '/books', label: 'Books', icon: '📚' },
    { to: '/users', label: 'Users', icon: '👤' },
    { to: '/reservations', label: 'Reservations', icon: '🔖' },
    ]

    export default function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-4 gap-2 fixed top-0 left-0">
        <div className="mb-6 px-2">
            <h1 className="text-xl font-bold text-white">📖 Library App</h1>
            <p className="text-gray-400 text-sm">Management System</p>
        </div>

        <nav className="flex flex-col gap-1">
            {links.map((link) => (
            <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
                }
            >
                <span>{link.icon}</span>
                {link.label}
            </NavLink>
            ))}
        </nav>
        </aside>
    )
    }