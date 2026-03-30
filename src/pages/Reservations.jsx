    import { useEffect, useState } from 'react'
    import {
    getReservations,
    createReservation,
    cancelReservation,
    } from '../services/reservationService'
    import { getUsers } from '../services/userService'
    import { getAvailableBooks } from '../services/bookService'

    export default function Reservations() {
    const [reservations, setReservations] = useState([])
    const [users, setUsers] = useState([])
    const [availableBooks, setAvailableBooks] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState('')
    const [selectedBookId, setSelectedBookId] = useState('')
    const [error, setError] = useState('')
    const [filterActive, setFilterActive] = useState(false)

    const fetchReservations = () => {
        getReservations().then(res => setReservations(res.data))
    }

    useEffect(() => { fetchReservations() }, [])

    const openModal = () => {
        setSelectedUserId('')
        setSelectedBookId('')
        setError('')
        Promise.all([getUsers(), getAvailableBooks()]).then(([u, b]) => {
        setUsers(u.data)
        setAvailableBooks(b.data)
        })
        setShowModal(true)
    }

    const handleCreate = async () => {
        if (!selectedUserId || !selectedBookId) {
        setError('Please select a user and a book.')
        return
        }
        try {
        await createReservation(selectedUserId, selectedBookId)
        setShowModal(false)
        fetchReservations()
        } catch (e) {
        setError(e.response?.data?.message || 'An error occurred.')
        }
    }

    const handleCancel = async (id) => {
        if (!confirm('Cancel this reservation?')) return
        try {
        await cancelReservation(id)
        fetchReservations()
        } catch (e) {
        alert(e.response?.data?.message || 'Could not cancel reservation.')
        }
    }

    const displayed = filterActive
        ? reservations.filter(r => r.active)
        : reservations

    return (
        <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div>
            <h1 className="text-2xl font-bold text-gray-800">Reservations</h1>
            <p className="text-gray-500 text-sm mt-1">
                {reservations.filter(r => r.active).length} active ·{' '}
                {reservations.length} total
            </p>
            </div>
            <div className="flex items-center gap-3">
            <button
                onClick={() => setFilterActive(!filterActive)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                filterActive
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
            >
                {filterActive ? 'Show All' : 'Active Only'}
            </button>
            <button
                onClick={openModal}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
                + New Reservation
            </button>
            </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">User</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Book</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Reserved</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Returned</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Status</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Actions</th>
                </tr>
            </thead>
            <tbody>
                {displayed.length === 0 && (
                <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-400">
                    No reservations found.
                    </td>
                </tr>
                )}
                {displayed.map((r, i) => (
                <tr key={r.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-6 py-4 font-medium text-gray-800">{r.userName}</td>
                    <td className="px-6 py-4 text-gray-600">{r.bookTitle}</td>
                    <td className="px-6 py-4 text-gray-500">{r.reservationDate}</td>
                    <td className="px-6 py-4 text-gray-500">{r.returnDate || '—'}</td>
                    <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        r.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                        {r.active ? 'Active' : 'Returned'}
                    </span>
                    </td>
                    <td className="px-6 py-4">
                    {r.active && (
                        <button
                        onClick={() => handleCancel(r.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                        >
                        Cancel
                        </button>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Modal */}
        {showModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-lg font-bold text-gray-800 mb-4">New Reservation</h2>

                {error && (
                <p className="text-red-500 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg">
                    {error}
                </p>
                )}

                <div className="flex flex-col gap-3">
                <select
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    value={selectedUserId}
                    onChange={e => setSelectedUserId(e.target.value)}
                >
                    <option value="">Select a user *</option>
                    {users.map(u => (
                    <option key={u.id} value={u.id}>{u.name} — {u.email}</option>
                    ))}
                </select>

                <select
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    value={selectedBookId}
                    onChange={e => setSelectedBookId(e.target.value)}
                >
                    <option value="">Select a book *</option>
                    {availableBooks.map(b => (
                    <option key={b.id} value={b.id}>{b.title} — {b.author}</option>
                    ))}
                </select>
                </div>

                {availableBooks.length === 0 && (
                <p className="text-amber-600 text-xs mt-2 bg-amber-50 px-3 py-2 rounded-lg">
                    ⚠️ No available books at the moment.
                </p>
                )}

                <div className="flex justify-end gap-2 mt-6">
                <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
                >
                    Cancel
                </button>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-gray-700"
                >
                    Create Reservation
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    )
    }