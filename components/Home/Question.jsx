import './Question.css';
import React from 'react';
 // Import the CSS file

const faqs = [
    {
        question: "What is the impact of my donation on the education of underserved children through the Swara Foundation?",
        answer: "Your donation to the Swara Foundation has a direct and transformative impact on the education of underserved children. It provides access to quality education, essential learning resources, and vital support services. Your contribution helps these children break the cycle of poverty, acquire knowledge and skills, and build a brighter future."
    },
    {
        question: "How will the Swara Foundation keep me updated about ongoing/upcoming activities?",
        answer: "The Swara Foundation will keep you informed about ongoing and upcoming activities through regular email updates. You will receive detailed newsletters and announcements about events, programs, and initiatives. Additionally, we will share updates on our website and social media platforms, ensuring you stay connected with our efforts and achievements."
    },
    {
      question : "How Can I Contribute to the Swara Foundation?",
      answer: "Donating to the Swara Foundation is simple and convenient. We organize donation camps where you can contribute in person. Additionally, our website features a Donation section where you can list the items you wish to donate and select a convenient date and time for pick-up. Our pick-up partner will then collect your donations from your location, ensuring a seamless experience. Your generosity helps us make a significant impact on the lives of underprivileged children."
    },
    {
      question:"What is the Operation Area of Swara Foundation?",
      answer : "Currently, the Swara Foundation operates in the South-West Delhi region, where we organize various activities and initiatives. To check if we can reach your area, please visit the Donation section on our website and enter your pincode. If we are not available in your area, you can still support us by shipping your items or donations to our address."
    }
];

function Question() {
  return (
    <div className="faq-container">
      {faqs.map((faq, index) => (
        <div className="faq-item" key={index}>
          <p className="faq-question">
            <a className="btn btn-primary faq-button" data-bs-toggle="collapse" href={`#c${index}`} role="button" aria-expanded="false" aria-controls={`c${index}`}>
              {faq.question}
            </a>
          </p>
          <div className="collapse faq-answer" id={`c${index}`}>
            <div className="card card-body">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Question;
