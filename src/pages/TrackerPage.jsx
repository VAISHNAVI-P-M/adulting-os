import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { useNavigate } from 'react-router-dom'
const CHECKLIST = [
  {
    category: 'Documents',
    icon: '📄',
    items: [
      { id: 'aadhaar', label: 'Aadhaar Card', points: 5 },
      { id: 'pan', label: 'PAN Card', points: 10 },
      { id: 'passport', label: 'Passport', points: 5 },
      { id: 'driving_license', label: 'Driving License', points: 5 },
    ]
  },
  {
    category: 'Banking',
    icon: '🏦',
    items: [
      { id: 'savings_account', label: 'Savings Account opened', points: 10 },
      { id: 'debit_card', label: 'Debit card activated', points: 5 },
      { id: 'upi', label: 'UPI set up', points: 5 },
      { id: 'fd', label: 'First Fixed Deposit', points: 10 },
    ]
  },
  {
    category: 'Finance',
    icon: '💰',
    items: [
      { id: 'budget', label: 'Monthly budget created', points: 10 },
      { id: 'emergency_fund', label: 'Emergency fund started', points: 15 },
      { id: 'health_insurance', label: 'Health insurance taken', points: 15 },
      { id: 'sip', label: 'First SIP started', points: 15 },
    ]
  },
  {
    category: 'Career',
    icon: '💼',
    items: [
      { id: 'salary_slip', label: 'Read your first salary slip', points: 5 },
      { id: 'pf', label: 'PF account activated', points: 10 },
      { id: 'itr', label: 'Filed first ITR', points: 15 },
    ]
  },
]

const ALL_ITEMS = CHECKLIST.flatMap(c => c.items)
const MAX_SCORE = ALL_ITEMS.reduce((sum, item) => sum + item.points, 0)

export default function TrackerPage() {
    const navigate = useNavigate()
  const [completed, setCompleted] = useState({})

  const toggle = (id) =>
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }))

  const score = ALL_ITEMS
    .filter(item => completed[item.id])
    .reduce((sum, item) => sum + item.points, 0)

  const percentage = Math.round((score / MAX_SCORE) * 100)

  const getLevel = (pct) => {
    if (pct < 20) return { level: 'Level 1 Adult', color: 'text-ink/50' }
    if (pct < 40) return { level: 'Level 2 Adult', color: 'text-sage' }
    if (pct < 60) return { level: 'Level 3 Adult', color: 'text-forest' }
    if (pct < 80) return { level: 'Level 4 Adult', color: 'text-lavender' }
    return { level: 'Level 5 Adult 🏆', color: 'text-gold' }
  }

  const { level, color } = getLevel(percentage)

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      


      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="mb-10">
          <p className="text-xs text-sage uppercase tracking-widest font-medium mb-2">Tracker</p>
          <h1 className="text-4xl font-medium text-forest tracking-tight mb-3">
            Life Readiness Score
          </h1>
          <p className="text-ink/55 leading-relaxed">
            Track your adulting milestones and level up.
          </p>
        </div>

        {/* Score card */}
        <div className="bg-forest rounded-3xl p-8 mb-8 flex items-center gap-8">
          <div className="relative w-32 h-32 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(253,248,243,0.1)" strokeWidth="10"/>
              <circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke="#9DB8A1"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - percentage / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-medium text-cream">{percentage}%</span>
            </div>
          </div>
          <div>
            <p className={`text-lg font-medium mb-1 ${color}`}>{level}</p>
            <p className="text-cream/60 text-sm mb-3">
              {score} of {MAX_SCORE} points earned
            </p>
            <p className="text-cream/50 text-xs leading-relaxed max-w-xs">
              {percentage < 50
                ? "You're just getting started. Every milestone counts! 🌱"
                : percentage < 80
                ? "Great progress! Keep going — you're adulting well. 💪"
                : "You're crushing adulting! Almost at max level. 🏆"}
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div className="flex flex-col gap-8">
          {CHECKLIST.map((section) => (
            <div key={section.category}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{section.icon}</span>
                <h2 className="text-lg font-medium text-forest">{section.category}</h2>
              </div>
              <div className="flex flex-col gap-2">
                {section.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition ${
                      completed[item.id]
                        ? 'bg-forest/5 border-forest/20'
                        : 'bg-white border-forest/10 hover:border-forest/20'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                      completed[item.id]
                        ? 'bg-forest border-forest'
                        : 'border-forest/25'
                    }`}>
                      {completed[item.id] && (
                        <span className="text-cream text-xs">✓</span>
                      )}
                    </div>
                    <span className={`text-sm flex-1 ${
                      completed[item.id] ? 'text-forest font-medium' : 'text-ink/70'
                    }`}>
                      {item.label}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      completed[item.id]
                        ? 'bg-sage/20 text-forest'
                        : 'bg-forest/5 text-ink/40'
                    }`}>
                      +{item.points} pts
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-ink/40">
            🌱 Your score updates as you check off milestones
          </p>
        </div>

      </div>
    </div>
  )
}