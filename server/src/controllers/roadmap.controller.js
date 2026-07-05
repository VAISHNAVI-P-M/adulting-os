import { geminiModel } from '../config/gemini.js'
import supabase from '../config/supabase.js'

const buildRoadmapPrompt = (profile) => `
You are a financial life coach for young Indians aged 20-28.

Generate a personalized life roadmap for this user:
- Age: ${profile.age}
- Status: ${profile.occupation}
- Monthly Income: ₹${profile.monthly_salary}
- Current Savings: ₹${profile.current_savings}
- Goals: ${profile.goals?.join(', ')}

Generate 5-7 levels. Each level = one concrete life milestone.
Prioritize based on their situation.
If savings is low → emergency fund before investing.
If student → focus on skills and documents first.

Return ONLY valid JSON. No explanation. No markdown. Just JSON:
{
  "levels": [
    {
      "level": 1,
      "title": "Open a savings account",
      "category": "banking",
      "why": "Every financial journey starts with a safe place to keep money",
      "how": "Visit any bank with Aadhaar and PAN. Zero balance accounts available at SBI, HDFC.",
      "estimated_time": "1 day",
      "priority": "critical"
    }
  ]
}
`

export const generateRoadmap = async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single()

    if (error || !profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    const prompt = buildRoadmapPrompt(profile)

    // New SDK call syntax
    const response = await geminiModel.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    })

    const text = response.text
    const clean = text.replace(/```json|```/g, '').trim()
    const roadmapData = JSON.parse(clean)

    await supabase
      .from('roadmaps')
      .update({ is_active: false })
      .eq('user_id', req.user.id)

    const { data: savedRoadmap, error: saveError } = await supabase
      .from('roadmaps')
      .insert({
        user_id: req.user.id,
        roadmap_data: roadmapData,
        is_active: true
      })
      .select()
      .single()

    if (saveError) throw saveError

    res.json({ roadmap: savedRoadmap })

  } catch (err) {
    console.error('Roadmap generation error:', err)
    res.status(500).json({ error: err.message })
  }
}

export const getRoadmap = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('roadmaps')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      return res.status(404).json({ error: 'No roadmap found' })
    }

    res.json({ roadmap: data })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}