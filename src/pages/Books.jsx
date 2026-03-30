import { useEffect, useState } from 'react'
import {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
} from '../services/bookService'

const emptyForm = { title: '', author: '', isbn: '', available: true }

export default function Books() {
    const [books, setBooks] = useState([])
    const [form, setForm] = useState(emptyForm)
    const [editingId, setEditingId] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState('')

    const fetchBooks = () => {
    getBooks().then(res => setBooks(res.data))
    }

    useEffect(() => { fetchBooks() }, [])

const openCreate = () => {
    setForm(emptyForm)
    setEditingId(null)
    setError('')
    setShowModal(true)
    }

const openEdit = (book) => {
    setForm({ title: book.title, author: book.author, isbn: book.isbn, available: book.available })
    setEditingId(book.id)
    setError('')
    setShowModal(true)
    }

const handleSubmit = async () => {
    if (!form.title || !form.author) {
        setError('Title and author are required.')
        return
    }
    try {
        if (editingId) {
            await updateBook(editingId, form)
        } else {
        await createBook(form)
        }
        setShowModal(false)
        fetchBooks()
    } catch (e) {
        setError(e.response?.data?.message || 'An error occurred.')
    }
    }

const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this book?')) return
    await deleteBook(id)
    fetchBooks()
    }

return (
        <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div>
            <h1 className="text-2xl font-bold text-gray-800">Books</h1>
            <p className="text-gray-500 text-sm mt-1">{books.length} books in the system</p>
            </div>
            <button
            onClick={openCreate}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
            + Add Book
            </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Title</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Author</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">ISBN</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Status</th>
                <th className="text-left px-6 py-4 text-gray-500 font-medium">Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.length === 0 && (
                <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-400">
                    No books found. Add one!
                    </td>
                </tr>
                )}
                {books.map((book, i) => (
                <tr key={book.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-6 py-4 font-medium text-gray-800">{book.title}</td>
                    <td className="px-6 py-4 text-gray-600">{book.author}</td>
                    <td className="px-6 py-4 text-gray-500">{book.isbn || '—'}</td>
                    <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.available
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                        {book.available ? 'Available' : 'Reserved'}
                    </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                    <button
                        onClick={() => openEdit(book)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(book.id)}
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
                {editingId ? 'Edit Book' : 'Add Book'}
                </h2>

                {error && (
                <p className="text-red-500 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg">
                    {error}
                </p>
                )}

                <div className="flex flex-col gap-3">
                <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Title *"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                />
                <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Author *"
                    value={form.author}
                    onChange={e => setForm({ ...form, author: e.target.value })}
                />
                <input
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="ISBN"
                    value={form.isbn}
                    onChange={e => setForm({ ...form, isbn: e.target.value })}
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
                    {editingId ? 'Save Changes' : 'Create Book'}
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    )
    }