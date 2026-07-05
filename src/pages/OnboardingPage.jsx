import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const GOALS = [
  { id: 'emergency_fund',  label: '🛡️ Emergency Fund' },
  { id: 'investing',       label: '📈 Start Investing' },
  { id: 'renting',         label: '🏠 Rent My Own Place' },
  { id: 'vehicle',         label: '🚗 Buy a Vehicle' },
  { id: 'insurance',       label: '🩺 Get Insurance' },
  { id: 'tax',             label: '📋 Understand Taxes' },
  { id: 'budgeting',       label: '💰 Get Better at Budgeting' },
  { id: 'credit',          label: '💳 Build Credit Score' },
];

const STEPS = ['About You', 'Your Money', 'Your Goals'];

export default function OnboardingPage() {
  const [step, setStep]     = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm]     = useState({
    age: '',
    occupation: '',
    monthly_salary: '',
    current_savings: '',
    goals: [],
  });
  const { user }  = useAuth();
  const navigate  = useNavigate();

  const update = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const toggleGoal = (id) =>
    setForm(prev => ({
      ...prev,
      goals: prev.goals.includes(id)
        ? prev.goals.filter(g => g !== id)
        : [...prev.goals, id],
    }));

  const handleFinish = async () => {
    if (form.goals.length === 0) {
      toast.error('Pick at least one goal');
      return;
    }
    setLoading(true);
    try {
      await api.put('/profile', {
        age: Number(form.age),
        occupation: form.occupation,
        monthly_salary: Number(form.monthly_salary),
        current_savings: Number(form.current_savings),
        goals: form.goals,
      });
      toast.success('Profile saved! Building your roadmap...');
      navigate('/dashboard');
    } catch {
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl mb-3">🌱</div>
          <h2 className="text-2xl font-medium text-forest">
            {step === 0 && `Welcome, ${user?.full_name?.split(' ')[0]}!`}
            {step === 1 && 'Your financial picture'}
            {step === 2 && 'What are your goals?'}
          </h2>
          <p className="text-sm text-ink/50 mt-1">
            {step === 0 && 'Tell us a bit about yourself'}
            {step === 1 && "This helps us personalize your roadmap"}
            {step === 2 && 'Pick everything that applies'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-1">
              <div className={`h-1.5 w-full rounded-full transition-all ${
                i <= step ? 'bg-forest' : 'bg-forest/15'
              }`} />
              <span className={`text-[10px] ${i <= step ? 'text-forest' : 'text-ink/30'}`}>
                {s}
              </span>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-forest/10 p-8">

          {/* Step 0: About You */}
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="text-xs text-ink/60 font-medium block mb-1.5">Your Age</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={e => update('age', e.target.value)}
                  placeholder="22"
                  min="16" max="40"
                  className="w-full border border-forest/15 rounded-xl px-4 py-3 text-sm bg-cream focus:outline-none focus:border-forest/40 transition"
                />
              </div>
              <div>
                <label className="text-xs text-ink/60 font-medium block mb-2">
                  Current situation
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'student',    label: '🎓 Student'     },
                    { id: 'working',    label: '💼 Working'     },
                    { id: 'freelancer', label: '💻 Freelancer'  },
                  ].map(o => (
                    <button
                      key={o.id}
                      onClick={() => update('occupation', o.id)}
                      className={`py-3 rounded-xl text-xs font-medium border transition ${
                        form.occupation === o.id
                          ? 'bg-forest text-cream border-forest'
                          : 'bg-cream border-forest/15 text-ink hover:border-forest/30'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Money */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="text-xs text-ink/60 font-medium block mb-1.5">
                  Monthly income (₹)
                </label>
                <input
                  type="number"
                  value={form.monthly_salary}
                  onChange={e => update('monthly_salary', e.target.value)}
                  placeholder="35000"
                  className="w-full border border-forest/15 rounded-xl px-4 py-3 text-sm bg-cream focus:outline-none focus:border-forest/40 transition"
                />
                <p className="text-xs text-ink/40 mt-1.5">Enter 0 if you're a student</p>
              </div>
              <div>
                <label className="text-xs text-ink/60 font-medium block mb-1.5">
                  Current savings (₹)
                </label>
                <input
                  type="number"
                  value={form.current_savings}
                  onChange={e => update('current_savings', e.target.value)}
                  placeholder="5000"
                  className="w-full border border-forest/15 rounded-xl px-4 py-3 text-sm bg-cream focus:outline-none focus:border-forest/40 transition"
                />
              </div>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {GOALS.map(g => (
                <button
                  key={g.id}
                  onClick={() => toggleGoal(g.id)}
                  className={`py-3.5 px-4 rounded-xl text-xs font-medium border text-left transition ${
                    form.goals.includes(g.id)
                      ? 'bg-forest text-cream border-forest'
                      : 'bg-cream border-forest/15 text-ink hover:border-forest/30'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="text-sm text-ink/50 hover:text-ink transition"
              >
                ← Back
              </button>
            ) : <div />}

            {step < 2 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={
                  (step === 0 && (!form.age || !form.occupation)) ||
                  (step === 1 && !form.monthly_salary)
                }
                className="bg-forest text-cream px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-forest/90 transition disabled:opacity-40"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={loading}
                className="bg-forest text-cream px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-forest/90 transition disabled:opacity-60"
              >
                {loading ? 'Saving...' : 'Build My Roadmap 🚀'}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}