import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import Vitals from './pages/Vitals';
import Medication from './pages/Medication';
import Emergency from './pages/Emergency';
import Routine from './pages/Routine';
import VideoCall from './pages/VideoCall';
import Settings from './pages/Settings';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="vitals" element={<Vitals />} />
            <Route path="medication" element={<Medication />} />
            <Route path="emergency" element={<Emergency />} />
            <Route path="routine" element={<Routine />} />
            <Route path="video-call" element={<VideoCall />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;