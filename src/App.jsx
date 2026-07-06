import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

import LandingPage    from './pages/LandingPage';
import AuthPage       from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage  from './pages/DashboardPage';
import RoadmapPage    from './pages/RoadmapPage';
import ChatPage       from './pages/ChatPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LearnPage   from './pages/LearnPage'
import TrackerPage from './pages/TrackerPage'
import ProfilePage from './pages/ProfilePage'
function SmartRedirect() {
  const { user, loading } = useAuth();
  
  // Wait for auth to finish loading before redirecting
  if (loading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-forest/40 text-sm">Loading...</div>
    </div>
  );
  
  if (!user) return <Navigate to="/auth" replace />;
  if (!user.age) return <Navigate to="/onboarding" replace />;
  return <Navigate to="/roadmap" replace />;
}
export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#234038', color: '#FDF8F3', fontSize: '13px' }
      }} />
      <Routes>
        <Route path="/"           element={<LandingPage />} />
        <Route path="/auth"       element={user ? <SmartRedirect /> : <AuthPage />} />
        <Route path="/onboarding" element={
          <ProtectedRoute><OnboardingPage /></ProtectedRoute>
        } />
        <Route path="/dashboard"  element={
          <ProtectedRoute><SmartRedirect /></ProtectedRoute>
        } />
        <Route path="/roadmap"    element={
          <ProtectedRoute><RoadmapPage /></ProtectedRoute>
        } />
        <Route path="/chat"       element={
          <ProtectedRoute><ChatPage /></ProtectedRoute>
        } />

        <Route path="/learn"   element={<LearnPage />} />
<Route path="/tracker" element={<TrackerPage />} />

       <Route path="/profile" element={
  <ProtectedRoute><ProfilePage /></ProtectedRoute>
} />
      </Routes>
    </BrowserRouter>
  );
}