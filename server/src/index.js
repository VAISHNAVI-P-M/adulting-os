import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import profileRoutes from './routes/profile.routes.js'
import roadmapRoutes from './routes/roadmap.routes.js'
import chatRoutes from './routes/chat.routes.js'

const app = express()

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://adulting-os-flame.vercel.app',
    ],
    credentials: true,
  })
)

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/roadmap', roadmapRoutes)
app.use('/api/chat', chatRoutes)

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Adulting OS Backend Running 🚀',
  })
})

app.get('/', (req, res) => {
  res.send('Welcome to Adulting OS API 🚀')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})