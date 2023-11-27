import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './PaymentPage.css';

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
  

  const walletBalance = 500;
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [accordionActive, setAccordionActive] = useState(null);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [generateOtp, setGenerateOtp] = useState(true);
  const [incorrectOtp, setIncorrectOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

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


  const handleSubmit = () => {
    setPaymentInProgress(true);
    console.log(paymentMethod);

    setTimeout(() => {
      setPaymentInProgress(false);

      if (paymentMethod === 'credit_card') {
        const { cardNumber, cardHolder, expirationDate, cvv } = paymentInfo;
      } else if (paymentMethod === 'digital_wallet') {
        console.log('Wtest1');
        // Simulate debit from the wallet for demonstration
        if (otpVerified) {
          // Debit the wallet amount
          debitWallet();
        }
      } else if (paymentMethod === 'cash_on_delivery') {
        const { deliveryAddress, contactNumber } = cashOnDeliveryInfo;
      }
    }, 1000);
  };

  const debitWallet = () => {
    // Simulate debiting the wallet amount
    console.log('Wallet debited successfully.');
    navigate('/ThankYouPage');
  };

  // Function to toggle the accordion
  const toggleAccordion = (index) => {
    if (accordionActive === index) {
      // Clicking on the active accordion closes it
      setAccordionActive(null);
      // Set the payment method to 'credit_card' when the accordion is closed
      handlePaymentMethodChange('credit_card');
    } else {
      // Clicking on a closed accordion opens it
      setAccordionActive(index);
      // Set the payment method based on the index (or other logic)
      if (index === 1) {
        handlePaymentMethodChange('credit_card');
      } else if (index === 2) {
        handlePaymentMethodChange('digital_wallet');
      } else if (index === 3) {
        handlePaymentMethodChange('cash_on_delivery');
      }
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

  const handleDebitAndRedirect = async () => {
    // You can make an API call to debit the wallet amount here
    try {
      // Make an API call to your backend to debit the wallet amount
      // Example:
      const response = await fetch('/api/debit-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Include any necessary data to perform the debit
        }),
      });

      if (response.ok) {
        // Debit was successful
        navigate('/thank-you')// Redirect to the 'Thank You' page
      } else {
        // Handle debit failure, maybe show an error message
        console.error('Debit failed');
      }
    } catch (error) {
      console.error('Error during debit:', error);
    }
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
