import { lazy, Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import RewardModal from './components/RewardModal';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import DashboardPage from './pages/DashboardPage';
import './App.css';

const ReportPage = lazy(() => import('./pages/ReportPage'));

function AppContent() {
  const { isDarkMode, setIsDarkMode, levelMessage, setLevelMessage } =
    useTaskContext();

  return (
    <main className={`appShell ${isDarkMode ? 'darkMode' : 'lightMode'}`}>
      <nav className="appNav">
        <div>
          <span>XP Ops</span>
          <strong>Gamified Task Manager</strong>
        </div>
        <div className="navActions">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/report">Report</NavLink>
          <button onClick={() => setIsDarkMode((current) => !current)}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route
          path="/report"
          element={
            <Suspense fallback={<p className="loadingRoute">Loading report...</p>}>
              <ReportPage />
            </Suspense>
          }
        />
      </Routes>

      {levelMessage && (
        <RewardModal
          level={levelMessage.level}
          earnedXp={levelMessage.earnedXp}
          onClose={() => setLevelMessage(null)}
        />
      )}
    </main>
  );
}

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;
