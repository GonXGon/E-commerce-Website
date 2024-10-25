import React, { useState } from 'react';
import './Faq.css';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Updated FAQ data for your website
  const faqData = [
    { 
      question: "How do I add products to the cart?", 
      answer: "To add products to your cart, simply click the 'Add to Cart' button on the product page. You can view your cart by clicking on the cart icon in the header." 
    },
    { 
      question: "Can I buy products directly without adding them to the cart?", 
      answer: "Yes, you can! Click the 'Buy Now' button on the product page to proceed directly to checkout for that specific item." 
    },
    { 
      question: "How can I view the total price of my cart?", 
      answer: "Your cart's total price is displayed at the bottom of the cart page. You can also modify the quantity of items to update the total in real-time." 
    },
    { 
      question: "What payment methods do you accept?", 
      answer: "We accept various payment methods including credit/debit cards, PayPal, and other secure online payment gateways." 
    },
    { 
      question: "How do I track my order?", 
      answer: "Once your order has been placed, you will receive an email with a tracking number. You can use this number to track your order status on our website." 
    },
    { 
      question: "Can I cancel or modify my order after placing it?", 
      answer: "You can modify or cancel your order within a limited time after placing it. Please contact our support team as soon as possible to make changes." 
    },
    { 
      question: "How do I create an account?", 
      answer: "Click on 'Sign Up' in the header. You’ll need to provide your email, create a password, and fill out basic details to complete the registration process." 
    },
    { 
      question: "What should I do if I forget my password?", 
      answer: "You can reset your password by clicking 'Forgot Password' on the login page. A password reset link will be sent to your registered email." 
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div 
            className={`faq-item ${openIndex === index ? 'open' : ''}`} 
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {item.question}
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
