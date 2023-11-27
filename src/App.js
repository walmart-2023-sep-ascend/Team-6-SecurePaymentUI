import React from 'react';
import './App.css';
import PaymentPage from './PaymentPage';
import FeedbackForm from './FeedbackForm';
import ThankYouPage from './ThankYouPage';
import Header from './Header';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Header />
    <h1>Secure Payment Page</h1>
      <div className="payment-container">
      <Routes>
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route path="/ThankYouPage" element={<ThankYouPage />} />
        <Route path="/FeedbackForm" element={<FeedbackForm />} />
      </Routes>
      </div>
    <Footer />
  </div>
    
  );
}

export default App;