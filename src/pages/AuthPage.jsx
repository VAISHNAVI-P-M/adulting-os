import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';

  const [tab, setTab]         = useState(initialTab);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({ full_name: '', email: '', password: '' });
  const { login, register }   = useAuth();
  const navigate              = useNavigate();

  // ... rest of your AuthPage code stays exactly the same

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (tab === 'register') {
        await register(form.email, form.password, form.full_name);
        toast.success('Account created!');
        navigate('/onboarding');
      } else {
        const data = await login(form.email, form.password);
        toast.success(`Welcome back!`);
        navigate(data.onboardingComplete ? '/dashboard' : '/onboarding');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-forest rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
            🌱
          </div>
          <h1 className="text-2xl font-medium text-forest">Adulting OS</h1>
          <p className="text-ink/50 text-sm mt-1">Your personal adulting companion</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-forest/10 p-8">

          {/* Tabs */}
          <div className="flex bg-cream rounded-2xl p-1 mb-8">
            {['login', 'register'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition capitalize ${
                  tab === t
                    ? 'bg-white text-forest shadow-sm'
                    : 'text-ink/50 hover:text-ink'
                }`}
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name field (register only) */}
            {tab === 'register' && (
              <div>
                <label className="text-xs text-ink/60 font-medium block mb-1.5">
                  Full Name
                </label>
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="Priya Sharma"
                  required
                  className="w-full border border-forest/15 rounded-xl px-4 py-3 text-sm bg-cream focus:outline-none focus:border-forest/40 transition"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                required
                className="w-full border border-forest/15 rounded-xl px-4 py-3 text-sm bg-cream focus:outline-none focus:border-forest/40 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-ink/60 font-medium block mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                required
                minLength={8}
                className="w-full border border-forest/15 rounded-xl px-4 py-3 text-sm bg-cream focus:outline-none focus:border-forest/40 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest text-cream py-3.5 rounded-xl text-sm font-medium hover:bg-forest/90 transition disabled:opacity-60 mt-2"
            >
              {loading ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create Account'}
            </button>

          </form>
        </div>

        <p className="text-center text-xs text-ink/40 mt-6">
          By continuing you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}