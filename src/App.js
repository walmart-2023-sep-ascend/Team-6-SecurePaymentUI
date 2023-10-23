import React from 'react';
import './App.css';
import PaymentPage from './PaymentPage';
import FeedbackForm from './FeedbackForm';
import Header from './Header';
import Footer from './Footer';
import PaymentOptions from './PaymentOptions';

function App() {
  return (
   // <div className="App">
   //   <Header />
   //     <main style={{ paddingTop: '100px' }}>
   //     <FeedbackForm />
   //     </main>
   //   <Footer />
   // </div>
    <div className="App">
    <Header />
    <h1>Secure Payment Page</h1>
      <div className="payment-container">
      <PaymentPage />
      </div>
    <Footer />
  </div>
    //<div className="App">
      //<PaymentPage />
    //</div>
    
  );
}

export default App;