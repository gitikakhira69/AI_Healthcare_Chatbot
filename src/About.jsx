import React from "react";
import "./About.css";


const AboutUs = () => {
  return (
    <div>
      {/* About Us Header Section */}
      <div className="about-us-header">
      <div className="overlay">
        <h1>About Us</h1>
      </div>
      </div>
      {/* Vision Section */}
      <section className="visions-container">
  <div className="visions-image">
    <img src="/images/About2.1.jpeg" alt="Scientist working" />
    <img src="/images/About2.2.jpeg" alt="Herbs in a bowl" className="small-img" />
  </div>
  
  <div className="visions-text">
    <h2>Visions</h2>
    <p>
      At Care Companian, we are dedicated to revolutionizing the healthcare industry 
      by providing cutting-edge technology for symptom diagnosis and data management.
    </p>
  </div>
</section>

      {/* Professional Team Section */}
      <section className="team-container">
  <div className="team-text">
    <h2>Professional Team</h2>
    <p>
      Our team is committed to delivering an intuitive and reliable chatbot 
      solution that streamlines the diagnostic process and enhances patient care.
    </p>
    <a href="#features" className="features-button">OUR FEATURES</a>
  </div>
  
  <div className="team-images">
    
          <img src="/images/About3.png" alt="Team member 1" />
          <img src="/images/About4.jpg" alt="Team member 2" />
          <img src="/images/About5.jpg" alt="Team member 3" />
  </div>
</section>

      <footer className="footer">
      <div className="footer-container">
        {/* Company Overview */}
        <div className="footer-section">
          <h3>Company Overview</h3>
          <p>
            We empower healthcare professionals with intelligent symptom analysis 
            and real-time data insights. Designed exclusively for doctors, our chatbot 
            simplifies patient interaction, enhances diagnostic efficiency, and supports 
            informed medical decisions.
          </p>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>📞 999 673 984</p>
          <p>📧 carecompanion@gmail.com</p>
        </div>

        {/* Services Section */}
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
  );
};

export default AboutUs;
