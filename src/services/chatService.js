import api from './api'

export const sendMessage  = (message) => api.post('/chat', { message })
export const getHistory   = ()        => api.get('/chat/history')