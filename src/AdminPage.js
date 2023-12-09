// AdminPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const fetchPendingReviews = async () => {
    try {
      const response = await axios.get('http://localhost:8990/api/approval/');
      const reviewsWithProductDetails = await Promise.all(
        response.data.map(async (review) => {
          const productDetails = await fetchProductDetails(review.productId);
          return { ...review, productDetails };
        })
      );
      setReviews(reviewsWithProductDetails);
    } catch (error) {
      console.error('Error fetching pending reviews:', error);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:8990/api/product/reviewSearchId/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product details for product ID ${productId}:`, error);
      return null;
    }
  };

  const handleApprove = (productId) => {
    // Implement approval logic here
    console.log(`Review for product ${productId} approved.`);
  };

  const handleReject = (productId) => {
    // Implement rejection logic here
    console.log(`Review for product ${productId} rejected.`);
  };

  return (
    <div>
        <h1>Pending Review</h1>
    <div className="admin-container" >
      {reviews.map((review) => (
        <div key={review.productId} className="review-container">
          <div className="review-details">
            <h3>{review.productDetails && review.productDetails.length > 0 ? review.productDetails[0].title : 'N/A'}</h3>
            {review.productDetails && review.productDetails.length > 0 && (
              <img src={review.productDetails[0].iconUrl} alt="Product Icon" style={{ maxWidth: '100px' }} />
            )}
            <p>User Email: {review.mail}</p>
          </div>
          <div className="comments-container">
            {review.comments.map((comment, index) => (
              <div key={index} className="comment-container">
                <p>User ID: {comment.user.userId}</p>
                <p>Comment: {comment.user.comment}</p>
                <p>Rating: {comment.user.rate}</p>
              </div>
            ))}
          </div>
          <div className="button-container">
            <button className="approve" onClick={() => handleApprove(review.productId)}>
              Approve
            </button>
            <button className="reject" onClick={() => handleReject(review.productId)}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default AdminPage;
