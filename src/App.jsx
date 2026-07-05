import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

import LandingPage    from './pages/LandingPage';
import AuthPage       from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage  from './pages/DashboardPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import RoadmapPage from './pages/RoadmapPage'
import ChatPage from './pages/ChatPage'
export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#234038', color: '#FDF8F3', fontSize: '13px' }
      }} />
      <Routes>
        <Route path="/"           element={<LandingPage />} />
        <Route path="/auth"       element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
        <Route path="/onboarding" element={
          <ProtectedRoute><OnboardingPage /></ProtectedRoute>
        } />
        <Route path="/dashboard"  element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />


        <Route path="/roadmap" element={
  <ProtectedRoute><RoadmapPage /></ProtectedRoute>
} />
      <Route path="/chat" element={
  <ProtectedRoute><ChatPage /></ProtectedRoute>
} />
      </Routes>
    </BrowserRouter>
  );
}