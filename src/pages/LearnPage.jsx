import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

const LESSONS = [
  {
    category: 'Money',
    color: 'bg-green-50 text-green-700',
    icon: '💰',
    lessons: [
      { title: 'How to budget your first salary', time: '5 min', level: 'Beginner' },
      { title: 'What is the 50/30/20 rule?', time: '4 min', level: 'Beginner' },
      { title: 'How to build an emergency fund', time: '6 min', level: 'Beginner' },
    ]
  },
  {
    category: 'Taxes',
    color: 'bg-orange-50 text-orange-700',
    icon: '📋',
    lessons: [
      { title: 'What is income tax and how is it calculated?', time: '7 min', level: 'Beginner' },
      { title: 'How to file ITR for the first time', time: '8 min', level: 'Intermediate' },
      { title: 'What is Form 16 and why do you need it?', time: '5 min', level: 'Beginner' },
    ]
  },
  {
    category: 'Housing',
    color: 'bg-pink-50 text-pink-700',
    icon: '🏠',
    lessons: [
      { title: 'How much rent can you afford?', time: '4 min', level: 'Beginner' },
      { title: 'What to check before signing a rental agreement', time: '6 min', level: 'Beginner' },
      { title: 'Security deposit — what are your rights?', time: '5 min', level: 'Beginner' },
    ]
  },
  {
    category: 'Insurance',
    color: 'bg-purple-50 text-purple-700',
    icon: '🛡️',
    lessons: [
      { title: 'Why you need health insurance in your 20s', time: '5 min', level: 'Beginner' },
      { title: 'Term life vs whole life insurance', time: '6 min', level: 'Intermediate' },
      { title: 'How to compare health insurance plans', time: '7 min', level: 'Intermediate' },
    ]
  },
  {
    category: 'Investing',
    color: 'bg-yellow-50 text-yellow-700',
    icon: '📈',
    lessons: [
      { title: 'What is a SIP and how to start one?', time: '5 min', level: 'Beginner' },
      { title: 'Mutual funds vs Fixed Deposits — which is better?', time: '7 min', level: 'Beginner' },
      { title: 'What is a Demat account and do you need one?', time: '5 min', level: 'Beginner' },
    ]
  },
  {
    category: 'Career',
    color: 'bg-blue-50 text-blue-700',
    icon: '💼',
    lessons: [
      { title: 'How to read your salary slip', time: '5 min', level: 'Beginner' },
      { title: 'What is PF and how does it work?', time: '6 min', level: 'Beginner' },
      { title: 'How to negotiate your first salary', time: '7 min', level: 'Intermediate' },
    ]
  },
]

export default function LearnPage() {
    
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const handleClick = (lesson) => {
    // Navigate to chat with the lesson topic pre-filled
    navigate(`/chat?topic=${encodeURIComponent(lesson.title)}`)
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="mb-10">
          <p className="text-xs text-sage uppercase tracking-widest font-medium mb-2">Learn</p>
          <h1 className="text-4xl font-medium text-forest tracking-tight mb-3">
            Learn real life skills
          </h1>
          <p className="text-ink/55 leading-relaxed">
            Short lessons. Real life impact. No jargon. Click any lesson to ask the AI Life Coach.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {LESSONS.map((section) => (
            <div key={section.category}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{section.icon}</span>
                <h2 className="text-lg font-medium text-forest">{section.category}</h2>
              </div>
              <div className="grid gap-3">
                {section.lessons.map((lesson, i) => (
                  <button
                    key={i}
                    onClick={() => handleClick(lesson)}
                    className="bg-white border border-forest/10 rounded-2xl px-5 py-4 flex items-center justify-between hover:border-forest/30 hover:shadow-sm transition cursor-pointer text-left w-full"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-xs px-2.5 py-1 rounded-full font-medium ${section.color}`}>
                        {section.category}
                      </div>
                      <span className="text-sm text-forest font-medium">{lesson.title}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-ink/40">{lesson.time}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        lesson.level === 'Beginner'
                          ? 'bg-sage/20 text-forest'
                          : 'bg-lavender/20 text-purple-700'
                      }`}>
                        {lesson.level}
                      </span>
                      <span className="text-lavender text-sm">✨</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-forest rounded-2xl p-6 text-center">
          <p className="text-cream/70 text-sm mb-3">
            Have a specific question about any of these topics?
          </p>
          <a
            href="/chat"
            className="inline-flex items-center gap-2 bg-lavender text-forest text-sm font-medium px-5 py-2.5 rounded-full hover:bg-lavender/80 transition"
          >
            ✨ Ask Life Coach AI
          </a>
        </div>

      </div>
    </div>
  )
}