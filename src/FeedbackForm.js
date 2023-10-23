import React, { useState } from 'react';
import './FeedbackForm.css'; // Import the CSS styles
import Footer from './Footer';
import Header from './Header';

function FeedbackForm() {
    const [responses, setResponses] = useState({
      question1: 0,
      question2: 0,
      question3: 0,
      question4: 0,
      question5: 0,
    });
  
    const [userComments, setUserComments] = useState('');
  
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  
    const handleStarClick = (question, rating) => {
      setResponses({
        ...responses,
        [question]: rating,
      });
  
      if (
        responses.question1 !== 0 &&
        responses.question2 !== 0 &&
        responses.question3 !== 0 &&
        responses.question4 !== 0 &&
        responses.question5 !== 0
      ) {
        setAllQuestionsAnswered(true);
      } else {
        setAllQuestionsAnswered(false);
      }
    };
  
    const handleUserCommentsChange = (e) => {
      setUserComments(e.target.value);
    };
  
    const handleSubmit = () => {
      const isAllQuestionsAnswered =
        responses.question1 !== 0 &&
        responses.question2 !== 0 &&
        responses.question3 !== 0 &&
        responses.question4 !== 0 &&
        responses.question5 !== 0;
  
      if (isAllQuestionsAnswered) {
        console.log('User feedback:', responses);
        console.log('User comments:', userComments);
  
        // You can send the 'responses' object and 'userComments' to your backend or perform any other actions here
        // Reset the form or navigate to another page
      } else {
        alert('Please answer all questions before submitting.');
      }
    };

  return (
    <div className="feedback-form">
      <h2>Customer Feedback</h2>

      {/* Question 1 */}
      <div className="question">
        <p>1. Were you able to find the exact item you were looking for?
        <span className="mandatory">*</span>
        </p>
        {/* Star ratings */}
        <div className="star-ratings">
          {[1, 2, 3, 4, 5].map((rating) => (
            <span
              key={`question1-rating-${rating}`}
              className={`star ${responses.question1 >= rating ? 'selected' : ''}`}
              onClick={() => handleStarClick('question1', rating)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Question 2 */}
      <div className="question">
        <p>2. Is the price of the product reasonable?
        <span className="mandatory">*</span>
        </p>
        {/* Star ratings */}
        <div className="star-ratings">
          {[1, 2, 3, 4, 5].map((rating) => (
            <span
              key={`question2-rating-${rating}`}
              className={`star ${responses.question2 >= rating ? 'selected' : ''}`}
              onClick={() => handleStarClick('question2', rating)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Question 3 */}
      <div className="question">
        <p>3. Are you able to quickly compare similar products?
        <span className="mandatory">*</span>
        </p>
        {/* Star ratings */}
        <div className="star-ratings">
          {[1, 2, 3, 4, 5].map((rating) => (
            <span
              key={`question3-rating-${rating}`}
              className={`star ${responses.question3 >= rating ? 'selected' : ''}`}
              onClick={() => handleStarClick('question3', rating)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Question 4 */}
      <div className="question">
        <p>4. How is the experience with suggested products if the exact product is not available?
        <span className="mandatory">*</span>
        </p>
        {/* Star ratings */}
        <div className="star-ratings">
          {[1, 2, 3, 4, 5].map((rating) => (
            <span
              key={`question4-rating-${rating}`}
              className={`star ${responses.question4 >= rating ? 'selected' : ''}`}
              onClick={() => handleStarClick('question4', rating)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Question 5 */}
      <div className="question">
        <p>5. Your overall shopping experience with us?
        <span className="mandatory">*</span>
        </p>
        {/* Star ratings */}
        <div className="star-ratings">
          {[1, 2, 3, 4, 5].map((rating) => (
            <span
              key={`question5-rating-${rating}`}
              className={`star ${responses.question5 >= rating ? 'selected' : ''}`}
              onClick={() => handleStarClick('question5', rating)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
        {/* User Comments */}
        <div className="user-comments">
        <label htmlFor="comments">Comments:</label>
        <div><textarea
            id="comments"
            name="comments"
            value={userComments}
            onChange={handleUserCommentsChange}
            rows="4"
            cols="10"
        /></div>
        </div>

      {/* Submit button */}
      <button className={`text-center ${allQuestionsAnswered ? '' : 'disabled'}`} onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
  );
}

export default FeedbackForm;
