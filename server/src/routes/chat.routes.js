import { Router } from 'express'
import { sendMessage, getChatHistory } from '../controllers/chat.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = Router()

router.post('/',        authMiddleware, sendMessage)
router.get('/history', authMiddleware, getChatHistory)

export default router