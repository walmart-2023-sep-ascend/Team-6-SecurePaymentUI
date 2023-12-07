// ReviewForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewForm.css'; // Include your existing CSS

const ReviewForm = ({ onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    // Fetch product details when the component mounts
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8990/api/product/reviewSearchId/44');
      console.log('Product details response:', response.data);
  
      if (Array.isArray(response.data) && response.data.length > 0) {
        setProductDetails(response.data[0]);
      } else {
        // Handle the case where the response is not as expected
        console.error('Invalid product details response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // You can perform validation here if needed

    // Call the onReviewSubmit function from the parent component
    onReviewSubmit({ rating, comment });

    // Reset the form
    setRating(0);
    setComment('');
  };

  return (
    <div>
      {productDetails ? (
        <div className="product-details-container">
          <img src={productDetails.iconUrl} alt={productDetails.title} className="product-image" />
          <div className="product-info">
            <h2>{productDetails.title}</h2>
            <p className="product-name">{productDetails.productName}</p>
            <p className="short-description">{productDetails.shortDescription}</p>
            <p className="long-description">{productDetails.longDescription}</p>
          </div>
        </div>
      ) : (
        <div>Loading product details...</div>
      )}

      <h2>Add Review</h2>
      <div className="star-ratings">
        {[1, 2, 3, 4, 5].map((index) => (
          <span
            key={index}
            className={`star ${rating >= index ? 'selected' : ''}`}
            onClick={() => handleRatingChange(index)}
          >
            ★
          </span>
        ))}
      </div>

      <br />
      <label className="review-form-label">
        Comment <br/>
        <textarea className="review-form-textarea" value={comment} onChange={handleCommentChange} />
      </label>
      <br />
      <button className="submit-button" onClick={handleSubmit}>
        Submit Review
      </button>
    </div>
  );
};

export default ReviewForm;
