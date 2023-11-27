import React from 'react';
import './ThankYouPage.css'; // Import your custom CSS for styling
import Header from './Header';
import Footer from './Footer';

function ThankYouPage() {
  return (
    <div className="thank-you-container">
      <Header />

      <div className="thank-you-page">
        <h2>Thank You for Your Purchase!</h2>
        <p>Your payment was successful, and your order has been confirmed.</p>

        <div className="order-details">
          <h3>Order Details:</h3>
          {/* Display relevant order details here */}
          <p>Order Number: 123456</p>
          <p>Payment Method: Digital Wallet</p>
          {/* Add more order details as needed */}
        </div>

        <p>We appreciate your business. If you have any questions or concerns, please contact our customer support.</p>

        {/* Additional content or links can be added based on your requirements */}
      </div>

      <Footer />
    </div>
  );
}

export default ThankYouPage;
