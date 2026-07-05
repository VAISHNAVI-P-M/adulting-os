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

export default function OnboardingPage() {
  const [step, setStep]       = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({
    age: '',
    occupation: '',
    monthly_salary: '',
    current_savings: '',
    college_year: '',
    pocket_money: '',
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

  const isStudent = form.occupation === 'student';

  const handleFinish = async () => {
    if (form.goals.length === 0) {
      toast.error('Pick at least one goal');
      return;
    }
    setLoading(true);
    try {
      const salary = isStudent
        ? Number(form.pocket_money || 0)
        : Number(form.monthly_salary || 0);

      const savings = Number(form.current_savings || 0);

      const payload = {
        age:            Number(form.age),
        occupation:     form.occupation,
        monthly_salary: salary,
        current_savings: savings,
        goals:          form.goals,
      };

      console.log('Saving profile:', payload);

      const res = await api.put('/profile', payload);
      console.log('Profile saved:', res.data);

      toast.success('Profile saved! 🚀');
      navigate('/roadmap');
    } catch (err) {
      console.error('Save error:', err);
      toast.error(err.response?.data?.error || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const steps = ['About You', isStudent ? 'Student Info' : 'Your Money', 'Your Goals'];

  return (
    <div className="min-h-screen bg-cream flex flex-col">

      {/* Back to home */}
      <div className="p-4">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-ink/40 hover:text-forest transition flex items-center gap-1"
        >
          ← Back to home
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-lg">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-3xl mb-3">🌱</div>
            <h2 className="text-2xl font-medium text-forest">
              {step === 0 && `Welcome, ${user?.full_name?.split(' ')[0]}!`}
              {step === 1 && (isStudent ? 'Your student life' : 'Your financial picture')}
              {step === 2 && 'What are your goals?'}
            </h2>
            <p className="text-sm text-ink/50 mt-1">
              {step === 0 && 'Tell us a bit about yourself'}
              {step === 1 && (isStudent ? 'Help us understand your situation' : 'This helps personalize your roadmap')}
              {step === 2 && 'Pick everything that applies'}
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex gap-2 mb-8">
            {steps.map((s, i) => (
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

            {/* Step 0 — About You */}
            {step === 0 && (
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-xs text-ink/60 font-medium block mb-1.5">
                    Your Age
                  </label>
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
                      { id: 'student',    label: '🎓 Student'    },
                      { id: 'working',    label: '💼 Working'    },
                      { id: 'freelancer', label: '💻 Freelancer' },
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

            {/* Step 1 — Student */}
            {step === 1 && isStudent && (
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-xs text-ink/60 font-medium block mb-1.5">
                    College year
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {['1st', '2nd', '3rd', '4th'].map(y => (
                      <button
                        key={y}
                        onClick={() => update('college_year', y)}
                        className={`py-2.5 rounded-xl text-xs font-medium border transition ${
                          form.college_year === y
                            ? 'bg-forest text-cream border-forest'
                            : 'bg-cream border-forest/15 text-ink hover:border-forest/30'
                        }`}
                      >
                        {y} year
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-ink/60 font-medium block mb-1.5">
                    Monthly pocket money (₹)
                  </label>
                  <input
                    type="number"
                    value={form.pocket_money}
                    onChange={e => update('pocket_money', e.target.value)}
                    placeholder="e.g. 2000"
                    className="w-full border border-forest/15 rounded-xl px-4 py-3 text-sm bg-cream focus:outline-none focus:border-forest/40 transition"
                  />
                  <p className="text-xs text-ink/40 mt-1.5">
                    Enter 0 if parents cover everything
                  </p>
                </div>

                <div>
                  <label className="text-xs text-ink/60 font-medium block mb-1.5">
                    Any savings so far? (₹)
                  </label>
                  <input
                    type="number"
                    value={form.current_savings}
                    onChange={e => update('current_savings', e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full border border-forest/15 rounded-xl px-4 py-3 text-sm bg-cream focus:outline-none focus:border-forest/40 transition"
                  />
                  <p className="text-xs text-ink/40 mt-1.5">
                    Enter 0 if none — no judgment!
                  </p>
                </div>
              </div>
            )}

            {/* Step 1 — Working/Freelancer */}
            {step === 1 && !isStudent && (
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-xs text-ink/60 font-medium block mb-1.5">
                    Monthly income (₹)
                  </label>
                  <input
                    type="number"
                    value={form.monthly_salary}
                    onChange={e => update('monthly_salary', e.target.value)}
                    placeholder="e.g. 35000"
                    className="w-full border border-forest/15 rounded-xl px-4 py-3 text-sm bg-cream focus:outline-none focus:border-forest/40 transition"
                  />
                </div>
                <div>
                  <label className="text-xs text-ink/60 font-medium block mb-1.5">
                    Current savings (₹)
                  </label>
                  <input
                    type="number"
                    value={form.current_savings}
                    onChange={e => update('current_savings', e.target.value)}
                    placeholder="e.g. 10000"
                    className="w-full border border-forest/15 rounded-xl px-4 py-3 text-sm bg-cream focus:outline-none focus:border-forest/40 transition"
                  />
                  <p className="text-xs text-ink/40 mt-1.5">
                    Enter 0 if just starting — that's okay!
                  </p>
                </div>
              </div>
            )}

            {/* Step 2 — Goals */}
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
                    (step === 1 && isStudent && !form.college_year) ||
                    (step === 1 && !isStudent && !form.monthly_salary)
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
    </div>
  );
}