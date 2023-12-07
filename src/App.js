import React from 'react';
import './App.css';
import PaymentPage from './PaymentPage';
import FeedbackForm from './FeedbackForm';
import ThankYouPage from './ThankYouPage';
import Header from './Header';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';
import FeedBackThank from './FeedBackThank';
import ReviewForm from './ReviewForm';

function App() {
  return (
    <div className="App">
    <Header />
      <div className="payment-container">
      <Routes>
        <Route path="/PaymentPage" element={<PaymentPage />} />
        <Route path="/ThankYouPage" element={<ThankYouPage />} />
        <Route path="/FeedbackForm/:userID/:cartID" element={<FeedbackForm />} />
        <Route path="/FeedBackThank" element={<FeedBackThank /> } />
        <Route path="/ReviewForm" element={<ReviewForm /> } />
      </Routes>
      </div>
    <Footer />
  </div>
    
  );
}

export default App;