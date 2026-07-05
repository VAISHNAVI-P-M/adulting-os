import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-cream border-b border-forest/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo — always goes home */}
        <Link to="/" className="flex items-center gap-2 text-forest font-medium text-base">
          <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center">
            🌱
          </div>
          Adulting OS
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          <li>
            <Link to="/" className="text-sm text-ink/60 hover:text-forest transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/roadmap" className="text-sm text-ink/60 hover:text-forest transition-colors">
              Roadmap
            </Link>
          </li>
          <li>
            <Link to="/learn" className="text-sm text-ink/60 hover:text-forest transition-colors">
              Learn
            </Link>
          </li>
          <li>
            <Link to="/tracker" className="text-sm text-ink/60 hover:text-forest transition-colors">
              Tracker
            </Link>
          </li>
          <Link to="/profile" className="text-sm text-ink/60 hover:text-forest transition-colors">
  Profile
</Link>
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/chat"
                className="bg-lavender text-forest text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 hover:bg-lavender/80 transition-colors"
              >
                ✨ Ask Life Coach AI
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-ink/40 hover:text-forest transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth?tab=login"
                className="text-sm text-ink/60 hover:text-forest transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/auth?tab=register"
                className="bg-forest text-cream text-sm font-medium px-4 py-2 rounded-full hover:bg-forest/90 transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}