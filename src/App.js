import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/organisms/Navbar/Navbar';
import CapturePage from './components/pages/CapturePage';
import UploadPage from './components/pages/UploadPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/capture" element={<CapturePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
