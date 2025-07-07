import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TournamentPage from './pages/TournamentPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Permanent redirect from old tournament number to new tournament key */}
        <Route path="/tournament/1000" element={<Navigate to="/tournament/2GRD" replace />} />
        
        {/* Tournament page route */}
        <Route path="/tournament/:id" element={<TournamentPage />} />
        
        {/* Default redirect to tournament */}
        <Route path="/" element={<Navigate to="/tournament/2GRD" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
