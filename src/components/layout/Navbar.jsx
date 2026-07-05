import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-cream border-b border-forest/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-forest font-medium text-base">
          <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center">
            🌱
          </div>
          Adulting OS
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {["Roadmap", "Learn", "Tracker", "Community"].map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase()}`}
                className="text-sm text-ink/60 hover:text-forest transition-colors"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side — changes based on auth state */}
        <div className="flex items-center gap-3">
          {user ? (
            // Logged in → show AI button
            <Link
              to="/chat"
              className="bg-lavender text-forest text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 hover:bg-lavender/80 transition-colors"
            >
              ✨ Ask Life Coach AI
            </Link>
          ) : (
            // Not logged in → show Sign in + Get started
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