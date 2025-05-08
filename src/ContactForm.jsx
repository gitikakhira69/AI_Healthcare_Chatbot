import React from "react";
import "./ContactForm.css";
import { FaUser, FaEnvelope, FaPen } from "react-icons/fa";
import { FaP } from "react-icons/fa6";

const ContactUs = () => {
  return (
    <div>
      <div className="contact-section">
      <div className="overlay">
        <h1>Contact Us</h1>
      </div>

      <div className="contact-container">
        

        <form className="contact-form">
        <h2>Send Us A Message</h2>
        <p>
          Get in touch with us to learn more about our healthcare chatbot solution
          and how it can enhance your medical practice.
        </p>
        <div className="input-group">
            <span className="i name">
              <FaUser />
            </span>
            <input type="text" placeholder="Name" required />
          </div>

          {/* Email Field */}
          <div className="input-group">
            <span className="i email">
              <FaEnvelope />
            </span>
            <input type="email" placeholder="Email" required />
          </div>

          {/* Message Field */}
          <div className="input-group">
          <span className="i msg">
              <FaPen />
            </span>
            <textarea placeholder="Message" rows="6" required></textarea>
          </div>

          <button className="submit" type="submit">Submit</button>
        </form>
      
      </div>
      
    </div>
    <div>
    <footer className="footer1">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Company Overview</h3>
            <p>
              We empower healthcare professionals with intelligent symptom analysis 
              and real-time data insights. Designed exclusively for doctors, our chatbot 
              simplifies patient interaction, enhances diagnostic efficiency, and supports 
              informed medical decisions.
            </p>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>📞 999 673 984</p>
            <p>📧 carecompanion@gmail.com</p>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li>Data Storage</li>
              <li>Symptom Analysis</li>
              <li>AI-Powered Chat Support</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
   </div>
    
    
  
  );
};

export default ContactUs;
