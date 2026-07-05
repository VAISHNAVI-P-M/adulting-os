import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import { generateRoadmap, getRoadmap } from '../services/roadmapService'
import toast from 'react-hot-toast'

const categoryColors = {
  banking:    'bg-blue-50 text-blue-700',
  savings:    'bg-green-50 text-green-700',
  tax:        'bg-orange-50 text-orange-700',
  insurance:  'bg-purple-50 text-purple-700',
  investing:  'bg-yellow-50 text-yellow-700',
  housing:    'bg-pink-50 text-pink-700',
  vehicles:   'bg-red-50 text-red-700',
  documents:  'bg-gray-50 text-gray-700',
}

const priorityBadge = {
  critical: 'bg-red-100 text-red-700',
  high:     'bg-orange-100 text-orange-700',
  medium:   'bg-yellow-100 text-yellow-700',
  low:      'bg-green-100 text-green-700',
}

export default function RoadmapPage() {
  const navigate = useNavigate()   // ← must be INSIDE the component
  const [roadmap, setRoadmap]         = useState(null)
  const [loading, setLoading]         = useState(true)
  const [generating, setGenerating]   = useState(false)
  const [expandedLevel, setExpanded]  = useState(null)

  useEffect(() => {
    fetchRoadmap()
  }, [])

  const fetchRoadmap = async () => {
    try {
      const res = await getRoadmap()
      setRoadmap(res.data.roadmap)
    } catch {
      setRoadmap(null)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await generateRoadmap()
      setRoadmap(res.data.roadmap)
      toast.success('Your roadmap is ready! 🚀')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to generate roadmap')
    } finally {
      setGenerating(false)
    }
  }

  const levels = roadmap?.roadmap_data?.levels || []

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

     

      <div className="max-w-3xl mx-auto px-6 py-8">

        <div className="mb-10">
          <p className="text-xs text-sage uppercase tracking-widest font-medium mb-2">
            Your Roadmap
          </p>
          <h1 className="text-4xl font-medium text-forest tracking-tight mb-3">
            Your personal life quest
          </h1>
          <p className="text-ink/55 leading-relaxed">
            Every level unlocked is a real life skill mastered.
          </p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🌱</div>
            <p className="text-ink/40 text-sm">Loading your roadmap...</p>
          </div>
        )}

        {!loading && !roadmap && (
          <div className="bg-white border border-forest/10 rounded-3xl p-12 text-center">
            <div className="text-5xl mb-6">🗺️</div>
            <h2 className="text-2xl font-medium text-forest mb-3">
              No roadmap yet
            </h2>
            <p className="text-ink/50 mb-8 max-w-sm mx-auto leading-relaxed">
              Let AI analyze your profile and build a personalized life roadmap just for you.
            </p>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-forest text-cream px-8 py-3.5 rounded-full text-sm font-medium hover:bg-forest/90 transition disabled:opacity-60"
            >
              {generating ? '✨ Generating your roadmap...' : '✨ Generate My Roadmap'}
            </button>
          </div>
        )}

        {!loading && roadmap && (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="text-xs text-ink/40 hover:text-forest border border-forest/15 px-4 py-2 rounded-full transition disabled:opacity-40"
              >
                {generating ? '✨ Regenerating...' : '↻ Regenerate roadmap'}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {levels.map((level, index) => (
                <div
                  key={level.level}
                  className="bg-white border border-forest/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpanded(expandedLevel === index ? null : index)}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-forest/[0.02] transition"
                  >
                    <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center text-cream text-sm font-medium flex-shrink-0">
                      {level.level}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-forest mb-1">
                        {level.title}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[level.category] || 'bg-sage/20 text-forest'}`}>
                          {level.category}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${priorityBadge[level.priority] || 'bg-sage/20 text-forest'}`}>
                          {level.priority}
                        </span>
                        <span className="text-[10px] text-ink/35">
                          ⏱ {level.estimated_time}
                        </span>
                      </div>
                    </div>
                    <div className={`text-ink/30 transition-transform ${expandedLevel === index ? 'rotate-180' : ''}`}>
                      ▾
                    </div>
                  </button>

                  {expandedLevel === index && (
                    <div className="px-5 pb-5 border-t border-forest/5">
                      <div className="pt-4 grid gap-4">
                        <div>
                          <p className="text-xs text-ink/40 font-medium uppercase tracking-wider mb-1.5">
                            Why this matters
                          </p>
                          <p className="text-sm text-ink/70 leading-relaxed">
                            {level.why}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-ink/40 font-medium uppercase tracking-wider mb-1.5">
                            How to do it
                          </p>
                          <p className="text-sm text-ink/70 leading-relaxed">
                            {level.how}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-sm text-ink/40">
                🌱 Complete each level to increase your Life Readiness Score
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  )
}