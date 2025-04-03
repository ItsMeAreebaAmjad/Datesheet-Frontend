import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/HomePage';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfServices';
import ContactUs from './Pages/ContactUs';
import CreateDateSheet from './Pages/CreateDateSheet';
import TemaplateSheet from './Pages/TemaplateSheet';
import ReviewInfo from './Pages/ReviewInfo';
import DateSheetPage from './Pages/DateSheetPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/term-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/create-datesheet" element={<CreateDateSheet />} />
          <Route path="/template-sheet" element={<TemaplateSheet />} />
          <Route path="/review-info" element={<ReviewInfo />} />
          <Route path="/ds-page" element={<DateSheetPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
