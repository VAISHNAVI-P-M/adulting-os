import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    age: '',
    occupation: 'student',
    monthly_salary: '',
    current_savings: '',
    goals: [],
  })

  // Load real profile from database on mount
  useEffect(() => {
    api.get('/profile')
      .then(res => {
        const p = res.data.profile
        setProfile({
          full_name:       p.full_name     || '',
          email:           p.email         || '',
          age:             p.age           || '',
          occupation:      p.occupation    || 'student',
          monthly_salary:  p.monthly_salary || '',
          current_savings: p.current_savings || '',
          goals:           p.goals         || [],
        })
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put('/profile', {
        age:             Number(profile.age),
        occupation:      profile.occupation,
        monthly_salary:  Number(profile.monthly_salary),
        current_savings: Number(profile.current_savings),
        goals:           profile.goals,
      })
      toast.success('Profile updated successfully!')
    } catch {
      toast.error('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <p className="text-forest/40 text-sm">Loading profile...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">

        <button
          onClick={() => navigate('/')}
          className="text-sm text-ink/40 hover:text-forest mb-6 flex items-center gap-1"
        >
          ← Back to home
        </button>

        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-sage font-medium mb-2">Profile</p>
          <h1 className="text-4xl font-medium text-forest mb-2">My Profile</h1>
          <p className="text-ink/55">Update your personal and financial information.</p>
        </div>

        <div className="bg-white rounded-3xl border border-forest/10 shadow-sm p-8">

          {/* Avatar */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-sage text-forest flex items-center justify-center text-4xl font-semibold">
              {profile.full_name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <h2 className="mt-4 text-xl font-medium text-forest">{profile.full_name}</h2>
            <p className="text-ink/50 text-sm">{profile.email}</p>
          </div>

          {/* Personal Info */}
          <h3 className="text-lg font-medium text-forest mb-5">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-5 mb-10">

            <div>
              <label className="text-sm text-ink/60">Name</label>
              <input
                name="full_name"
                value={profile.full_name}
                onChange={handleChange}
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream focus:outline-none focus:border-forest/40"
              />
            </div>

            <div>
              <label className="text-sm text-ink/60">Email</label>
              <input
                name="email"
                value={profile.email}
                disabled
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream/50 text-ink/40 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-sm text-ink/60">Age</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream focus:outline-none focus:border-forest/40"
              />
            </div>

            <div>
              <label className="text-sm text-ink/60">Current Status</label>
              <select
                name="occupation"
                value={profile.occupation}
                onChange={handleChange}
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream focus:outline-none focus:border-forest/40"
              >
                <option value="student">Student</option>
                <option value="working">Working</option>
                <option value="freelancer">Freelancer</option>
              </select>
            </div>

          </div>

          {/* Financial */}
          <h3 className="text-lg font-medium text-forest mb-5">Financial Information</h3>
          <div className="grid md:grid-cols-2 gap-5 mb-10">

            <div>
              <label className="text-sm text-ink/60">Monthly Income (₹)</label>
              <input
                type="number"
                name="monthly_salary"
                value={profile.monthly_salary}
                onChange={handleChange}
                placeholder="0"
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream focus:outline-none focus:border-forest/40"
              />
            </div>

            <div>
              <label className="text-sm text-ink/60">Current Savings (₹)</label>
              <input
                type="number"
                name="current_savings"
                value={profile.current_savings}
                onChange={handleChange}
                placeholder="0"
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream focus:outline-none focus:border-forest/40"
              />
            </div>

          </div>

          {/* Goals */}
          <h3 className="text-lg font-medium text-forest mb-5">Your Goals</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { id: 'emergency_fund', label: '🛡️ Emergency Fund' },
              { id: 'investing',      label: '📈 Investing'       },
              { id: 'renting',        label: '🏠 Renting'         },
              { id: 'vehicle',        label: '🚗 Vehicle'         },
              { id: 'insurance',      label: '🩺 Insurance'       },
              { id: 'tax',            label: '📋 Taxes'           },
              { id: 'budgeting',      label: '💰 Budgeting'       },
              { id: 'credit',         label: '💳 Credit Score'    },
            ].map(g => (
              <button
                key={g.id}
                onClick={() => setProfile(prev => ({
                  ...prev,
                  goals: prev.goals.includes(g.id)
                    ? prev.goals.filter(x => x !== g.id)
                    : [...prev.goals, g.id]
                }))}
                className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition ${
                  profile.goals.includes(g.id)
                    ? 'bg-forest text-cream border-forest'
                    : 'bg-cream border-forest/15 text-ink hover:border-forest/30'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-5 mb-10">
            <div className="bg-sage/15 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🌱</div>
              <div className="text-2xl font-semibold text-forest">
                {user?.life_readiness_score || 0}%
              </div>
              <div className="text-xs text-ink/50">Life Readiness</div>
            </div>
            <div className="bg-lavender/20 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🗺️</div>
              <div className="text-2xl font-semibold text-forest">
                {user?.current_level || 1}
              </div>
              <div className="text-xs text-ink/50">Current Level</div>
            </div>
            <div className="bg-yellow-100 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-semibold text-forest">
                {profile.goals?.length || 0}
              </div>
              <div className="text-xs text-ink/50">Active Goals</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-full border border-forest/20 text-forest hover:bg-forest/5 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 rounded-full bg-forest text-cream hover:bg-forest/90 transition disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}