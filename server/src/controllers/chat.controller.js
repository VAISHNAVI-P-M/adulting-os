import { geminiModel } from '../config/gemini.js'
import supabase from '../config/supabase.js'

const SYSTEM_PROMPT = `You are the Life Coach AI for Adulting OS — a friendly, knowledgeable guide for young adults navigating real life for the first time.

Your personality:
- Warm and encouraging, like a smart older sibling
- Practical and specific — never vague
- Use simple language — no jargon unless you explain it
- Indian context — use ₹, mention EPFO, PPF, ITR, Aadhaar, PAN where relevant
- Keep responses under 150 words unless the question requires depth
- End responses with a concrete next step or encouraging note

Rules:
- If the user gives their salary/savings, use those exact numbers
- Don't make up financial figures — use the user's actual data
- If you don't know something specific, say "I'd recommend checking with a CA for this"
- Never recommend specific stocks or mutual fund schemes
- Always prioritize emergency fund before investing`

const buildContextPrompt = (profile) => `
=== USER PROFILE ===
Name: ${profile.full_name}
Age: ${profile.age}
Status: ${profile.occupation}
Monthly Salary: ₹${profile.monthly_salary}
Current Savings: ₹${profile.current_savings}
Goals: ${profile.goals?.join(', ')}
Life Readiness Score: ${profile.life_readiness_score}%
`

// POST /api/chat
export const sendMessage = async (req, res) => {
  const { message } = req.body

  if (!message) return res.status(400).json({ error: 'Message is required' })

  try {
    // 1. Get user profile for context
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single()

    // 2. Get last 6 messages for conversation history
    const { data: history } = await supabase
      .from('chat_history')
      .select('role, content')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(6)

    const recentHistory = (history || []).reverse()

    // 3. Build full prompt with context + history
    const contextPrompt = buildContextPrompt(profile)
    const historyText = recentHistory
      .map(m => `${m.role === 'user' ? 'User' : 'Coach'}: ${m.content}`)
      .join('\n')

    const fullPrompt = `${SYSTEM_PROMPT}

${contextPrompt}

=== CONVERSATION HISTORY ===
${historyText}

=== NEW MESSAGE ===
User: ${message}

Respond as Life Coach AI:`

    // 4. Call Gemini
    const response = await geminiModel.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt
    })

    const reply = (typeof response.text === 'function' 
  ? response.text() 
  : response.text).trim()

    // 5. Save both messages to chat_history
    await supabase.from('chat_history').insert([
      { user_id: req.user.id, role: 'user',      content: message },
      { user_id: req.user.id, role: 'assistant', content: reply   }
    ])

    res.json({ reply })

  } catch (err) {
    console.error('Chat error:', err)
    res.status(500).json({ error: err.message })
  }
}

// GET /api/chat/history
export const getChatHistory = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .select('role, content, created_at')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: true })
      .limit(50)

    if (error) throw error

    res.json({ messages: data || [] })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}