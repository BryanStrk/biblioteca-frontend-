    import { useEffect, useState } from 'react'
    import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    } from '../services/userService'

    const emptyForm = { name: '', email: '', phone: '' }

    export default function Users() {
    const [users, setUsers] = useState([])
    const [form, setForm] = useState(emptyForm)
    const [editingId, setEditingId] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState('')

    const fetchUsers = () => {
        getUsers().then(res => setUsers(res.data))
    }

    useEffect(() => { fetchUsers() }, [])

    const openCreate = () => {
        setForm(emptyForm)
        setEditingId(null)
        setError('')
        setShowModal(true)
    }

    const openEdit = (user) => {
        setForm({ name: user.name, email: user.email, phone: user.phone || '' })
        setEditingId(user.id)
        setError('')
        setShowModal(true)
    }

    const handleSubmit = async () => {
        if (!form.name || !form.email) {
        setError('Name and email are required.')
        return
        }
        try {
        if (editingId) {
            await updateUser(editingId, form)
        } else {
            await createUser(form)
        }
        setShowModal(false)
        fetchUsers()
        } catch (e) {
        setError(e.response?.data?.message || 'An error occurred.')
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return
        try {
        await deleteUser(id)
        fetchUsers()
        } catch (e) {
        alert(e.response?.data?.message || 'Could not delete user.')
        }
    }

    return (
        <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div>
            <h1 className="text-2xl font-bold text-gray-800">Users</h1>
            <p className="text-gray-500 text-sm mt-1">{users.length} registered users</p>
            </div>
            <button
            onClick={openCreate}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
            + Add User
            </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Name</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Email</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Phone</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Registered</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 && (
                <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-400">
                    No users found. Add one!
                    </td>
                </tr>
                )}
                {users.map((user, i) => (
                <tr key={user.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-gray-500">{user.phone || '—'}</td>
                    <td className="px-6 py-4 text-gray-500">{user.registrationDate}</td>
                    <td className="px-6 py-4 flex gap-2">
                    <button
                        onClick={() => openEdit(user)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(user.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                    >
                        Delete
                    </button>
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
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                {editingId ? 'Edit User' : 'Add User'}
                </h2>

                {error && (
                <p className="text-red-500 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg">
                    {error}
                </p>
                )}

                <div className="flex flex-col gap-3">
                <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Name *"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Email *"
                    value={form.email}
                    disabled={!!editingId}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-gray-700"
                >
                    {editingId ? 'Save Changes' : 'Create User'}
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    )
    }