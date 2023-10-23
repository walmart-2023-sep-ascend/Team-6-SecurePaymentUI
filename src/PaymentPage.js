import React, { useState, useEffect } from 'react';
import './PaymentPage.css'; // Import your custom CSS for styling
import Footer from './Footer';
import Header from './Header';

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });
  const [cashOnDeliveryInfo, setCashOnDeliveryInfo] = useState({
    deliveryAddress: '',
    contactNumber: '',
  });
  const [digitalWalletInfo, setDigitalWalletInfo] = useState({
    walletName: '',
    walletPassword: '',
  });

  // Hardcoded wallet balance for demonstration
  const walletBalance = 500; // Replace with the actual balance from the backend

  const [paymentInProgress, setPaymentInProgress] = useState(false); // State for showing/hiding overlay
  const [accordionActive, setAccordionActive] = useState(null); // State to track active accordion
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [generateOtp, setGenerateOtp] = useState(true);
  const [incorrectOtp, setIncorrectOtp] = useState(false); // State for incorrect OTP message
  // State to track OTP verification status
  const [otpVerified, setOtpVerified] = useState(false);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  const handleCashOnDeliveryInfoChange = (e) => {
    const { name, value } = e.target;
    setCashOnDeliveryInfo({
      ...cashOnDeliveryInfo,
      [name]: value,
    });
  };

  const handleDigitalWalletInfoChange = (e) => {
    const { name, value } = e.target;
    setDigitalWalletInfo({
      ...digitalWalletInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Show payment in progress overlay
    setPaymentInProgress(true);

    // Simulate payment processing (e.g., with a setTimeout)
    setTimeout(() => {
      // Hide payment in progress overlay
      setPaymentInProgress(false);

      // Handle the payment submission here based on the selected payment method
      if (paymentMethod === 'credit_card') {
        // Submit credit card details from paymentInfo object
        const { cardNumber, cardHolder, expirationDate, cvv } = paymentInfo;
        // Perform the necessary actions to process the payment
      } else if (paymentMethod === 'digital_wallet') {
        // Submit digital wallet details from digitalWalletInfo object
        const { walletName, walletPassword } = digitalWalletInfo;
        // Perform the necessary actions to process the payment
      } else if (paymentMethod === 'cash_on_delivery') {
        // Submit cash on delivery details from cashOnDeliveryInfo object
        const { deliveryAddress, contactNumber } = cashOnDeliveryInfo;
        // Perform the necessary actions to process the payment
      }
    }, 5000); // Simulate a 5-second payment processing delay
  };

  // Function to toggle the accordion
  const toggleAccordion = (index) => {
    if (accordionActive === index) {
      // Clicking on the active accordion closes it
      setAccordionActive(null);
    } else {
      // Clicking on a closed accordion opens it
      setAccordionActive(index);
    }
  };

  // Function to handle OTP input
  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp(value);
  };

  // Function to handle OTP verification
  const handleVerifyOtp = () => {
    // Simulate OTP verification for testing purposes
    if (otp === '1234') {
      // Correct OTP
      setOtpVerified(true);
      setIncorrectOtp(false); // Reset incorrect OTP message
    } else {
      // Incorrect OTP
      setOtpVerified(false);
      setIncorrectOtp(true);
    }
  };

  // Function to handle resending OTP
  const handleResendOtp = () => {
    // Call the backend service to resend OTP
    // You can make an API request here to send a new OTP
    // Update the timer and OTP sent status
    setTimer(60);
    setOtpSent(true);
    setResendDisabled(true);
    setGenerateOtp(true); // Set to true to display "Generate OTP" button again
    setIncorrectOtp(false); // Reset incorrect OTP message
  };

  // Function to handle generating OTP
  const handleGenerateOtp = () => {
    // Call the backend service to generate OTP
    // You can make an API request here to generate a new OTP
    // Update the timer and OTP sent status
    setTimer(60);
    setOtpSent(true);
    setResendDisabled(true);
    setGenerateOtp(false); // Set to false to hide "Generate OTP" button
    setIncorrectOtp(false); // Reset incorrect OTP message
  };

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  return (
    <div className="payment-container">
      <div className="payment-page">
        <h2 className="payment-title">Secure Payment Page</h2>

        {/* Payment method selection */}
        <div className="payment-methods">
          {/* Accordion for Credit Card */}
          <div className={`accordion ${accordionActive === 1 ? 'active' : ''}`}>
            <div
              className="accordion-title"
              onClick={() => toggleAccordion(1)}
            >
              Credit Card
              <div className={`accordion-arrow ${accordionActive === 1 ? 'active' : ''}`}></div>
            </div>
            <div className="accordion-content">
              {/* Credit card input fields */}
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentInfoChange}
              />
              <input
                type="text"
                name="cardHolder"
                placeholder="Card Holder Name"
                value={paymentInfo.cardHolder}
                onChange={handlePaymentInfoChange}
              />
              <input
                type="text"
                name="expirationDate"
                placeholder="Expiration Date (MM/YY)"
                value={paymentInfo.expirationDate}
                onChange={handlePaymentInfoChange}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={handlePaymentInfoChange}
              />
            </div>
          </div>

          {/* Accordion for Digital Wallet */}
          <div className={`accordion ${accordionActive === 2 ? 'active' : ''}`}>
            <div
              className="accordion-title"
              onClick={() => toggleAccordion(2)}
            >
              Digital Wallet
              <div className={`accordion-arrow ${accordionActive === 2 ? 'active' : ''}`}></div>
            </div>
            <div className="accordion-content">
              <div className="digital-wallet-info">
                {/* Digital Wallet balance display */}
                <p>Your wallet balance: ${walletBalance}</p>
                {otpSent ? (
                  <>
                    {/* OTP input field */}
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={handleOtpChange}
                    />
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                    {incorrectOtp ? (
                      <>
                        <p style={{ color: 'red' }}>Incorrect OTP</p>
                        {timer > 0 ? (
                          <p>Resend OTP in {timer} seconds</p>
                        ) : (
                          <button onClick={handleResendOtp} disabled={resendDisabled}>
                            Resend OTP
                          </button>
                        )}
                      </>
                    ) : (
                      otpVerified ? (
                        <div>
                          {/* OTP verified, hide Resend OTP and Generate OTP */}
                        </div>
                      ) : (
                        <div>
                          {timer > 0 ? (
                            <p>Resend OTP in {timer} seconds</p>
                          ) : (
                            <button onClick={handleGenerateOtp}>Generate OTP</button>
                          )}
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <>
                    {generateOtp && (
                      <button onClick={handleGenerateOtp}>Generate OTP</button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Accordion for Cash on Delivery */}
          <div className={`accordion ${accordionActive === 3 ? 'active' : ''}`}>
            <div
              className="accordion-title"
              onClick={() => toggleAccordion(3)}
            >
              Cash on Delivery
              <div className={`accordion-arrow ${accordionActive === 3 ? 'active' : ''}`}></div>
            </div>
            <div className="accordion-content">
              {/* Cash on delivery input fields */}
              <input
                type="text"
                name="deliveryAddress"
                placeholder="Delivery Address"
                value={cashOnDeliveryInfo.deliveryAddress}
                onChange={handleCashOnDeliveryInfoChange}
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={cashOnDeliveryInfo.contactNumber}
                onChange={handleCashOnDeliveryInfoChange}
              />
            </div>
          </div>
        </div>

        {/* Submit Payment button */}
        <button onClick={handleSubmit} disabled={!otpVerified}>Submit Payment</button>
      </div>

      {/* Payment in progress overlay */}
      {paymentInProgress && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
