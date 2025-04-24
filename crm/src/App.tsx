import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Leads from './pages/Leads';
import Deals from './pages/Deals';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';
import Reports from './pages/Reports';
import Projects from './pages/Projects';
import Settings from './pages/Settings';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;