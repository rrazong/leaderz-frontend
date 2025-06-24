import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TournamentPage from './pages/TournamentPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tournament/:id" element={<TournamentPage />} />
        <Route path="/" element={<Navigate to="/tournament/1000" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
