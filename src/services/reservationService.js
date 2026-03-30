import api from './api'

export const getReservations = () => api.get('/reservations')
export const getActiveReservations = () => api.get('/reservations/active')
export const getReservationsByUser = (userId) => api.get(`/reservations/user/${userId}`)
export const createReservation = (userId, bookId) =>
    api.post(`/reservations?userId=${userId}&bookId=${bookId}`)
export const cancelReservation = (id) => api.patch(`/reservations/${id}/cancel`)