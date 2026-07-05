import { Router } from 'express'
import { generateRoadmap, getRoadmap } from '../controllers/roadmap.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = Router()

router.post('/generate', authMiddleware, generateRoadmap)
router.get('/', authMiddleware, getRoadmap)

export default router