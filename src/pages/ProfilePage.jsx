import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const navigate = useNavigate()

  const [profile, setProfile] = useState({
    name: 'Vaishnavi',
    email: 'vaishnavi@example.com',
    age: 22,
    status: 'Student',
    income: '',
    expenses: '',
    savings: '',
    goal: 'Build Emergency Fund'
  })

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    // Later replace with API call
    console.log(profile)
    toast.success('Profile updated successfully!')
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="text-sm text-ink/40 hover:text-forest mb-6"
        >
          ← Back to home
        </button>

        {/* Heading */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-sage font-medium mb-2">
            Profile
          </p>

          <h1 className="text-4xl font-medium text-forest mb-2">
            My Profile
          </h1>

          <p className="text-ink/55">
            Update your personal and financial information.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-forest/10 shadow-sm p-8">

          {/* Avatar */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-sage text-forest flex items-center justify-center text-4xl font-semibold">
              {profile.name.charAt(0)}
            </div>

            <h2 className="mt-4 text-xl font-medium text-forest">
              {profile.name}
            </h2>

            <p className="text-ink/50 text-sm">
              {profile.email}
            </p>
          </div>

          {/* Personal Info */}
          <h3 className="text-lg font-medium text-forest mb-5">
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5 mb-10">

            <div>
              <label className="text-sm text-ink/60">Name</label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-ink/60">Email</label>
              <input
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-ink/60">Age</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleChange}
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-ink/60">
                Current Status
              </label>

              <select
                name="status"
                value={profile.status}
                onChange={handleChange}
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream focus:outline-none"
              >
                <option>Student</option>
                <option>Working</option>
                <option>Freelancer</option>
              </select>
            </div>

          </div>

          {/* Financial */}
          <h3 className="text-lg font-medium text-forest mb-5">
            Financial Information
          </h3>

          <div className="grid md:grid-cols-3 gap-5 mb-10">

            <div>
              <label className="text-sm text-ink/60">
                Monthly Income
              </label>

              <input
                type="number"
                name="income"
                value={profile.income}
                onChange={handleChange}
                placeholder="₹"
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-ink/60">
                Monthly Expenses
              </label>

              <input
                type="number"
                name="expenses"
                value={profile.expenses}
                onChange={handleChange}
                placeholder="₹"
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-ink/60">
                Savings
              </label>

              <input
                type="number"
                name="savings"
                value={profile.savings}
                onChange={handleChange}
                placeholder="₹"
                className="mt-2 w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream focus:outline-none"
              />
            </div>

          </div>

          {/* Goal */}
          <h3 className="text-lg font-medium text-forest mb-5">
            Primary Goal
          </h3>

          <input
            name="goal"
            value={profile.goal}
            onChange={handleChange}
            className="w-full border border-forest/15 rounded-xl px-4 py-3 bg-cream mb-10 focus:outline-none"
          />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-5 mb-10">

            <div className="bg-sage/15 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🌱</div>
              <div className="text-2xl font-semibold text-forest">
                72%
              </div>
              <div className="text-xs text-ink/50">
                Life Readiness
              </div>
            </div>

            <div className="bg-lavender/20 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🗺️</div>
              <div className="text-2xl font-semibold text-forest">
                4
              </div>
              <div className="text-xs text-ink/50">
                Roadmap Level
              </div>
            </div>

            <div className="bg-yellow-100 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-semibold text-forest">
                7
              </div>
              <div className="text-xs text-ink/50">
                Day Streak
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">

            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-full border border-forest/20 text-forest"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-full bg-forest text-cream hover:bg-forest/90 transition"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}