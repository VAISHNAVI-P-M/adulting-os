import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import { useNavigate } from 'react-router-dom'
export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
  <div className="text-5xl mb-4">🌱</div>
  <h1 className="text-3xl font-medium text-forest mb-2">
    Welcome, {user?.full_name?.split(' ')[0]}!
  </h1>
  <p className="text-ink/50 mb-8">Your adulting journey begins here.</p>
  
  <div className="flex justify-center gap-4 flex-wrap">
    <button
      onClick={() => navigate('/roadmap')}
      className="bg-forest text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-forest/90 transition"
    >
      🗺️ View My Roadmap
    </button>
    <button
      onClick={() => navigate('/chat')}
      className="bg-lavender text-forest px-6 py-3 rounded-full text-sm font-medium hover:bg-lavender/80 transition"
    >
      ✨ Ask Life Coach AI
    </button>
  </div>
</div>
    </div>
  );
}