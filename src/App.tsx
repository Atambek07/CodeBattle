import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { WebSocketProvider } from './contexts/WebSocketContext';

// Layout
import { Layout } from './components/layout/Layout';

// Pages
import { HomePage } from './pages/HomePage';
import { DuelsPage } from './pages/DuelsPage';
import { TasksPage } from './pages/TasksPage';
import { DuelPage } from './pages/DuelPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WebSocketProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="duels" element={<DuelsPage />} />
              <Route path="duel/:duelId" element={<DuelPage />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="leaderboard" element={<LeaderboardPage />} />
              <Route path="profile/:username" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </WebSocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;