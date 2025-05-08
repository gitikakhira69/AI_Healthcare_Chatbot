import React from "react";
import "./Home.css";
import { FaTruck, FaUserCog, FaProjectDiagram } from "react-icons/fa"; 

const Home = () => {
  return (
    <div>
      <div className="hero">
      <div className="hero-content">
        <h1>Healthcare Chatbot</h1>
        <p>Diagnose And Store Data With Ease</p>
      </div>
    </div>
    {/* About Section with Images on Left & Text on Right */}
    <section className="about-section">
        <div className="about-container">
          {/* Left Side - Images */}
          <div className="about-images">
            <img src="/images/left_image1.jpeg" alt="Image 1" />
            <img src="/images/left_image2.jpeg" alt="Image 2" />
            
          </div>
          <div className="about-images">
          <img className="img1" src="/images/left_image.jpeg" alt="Image 3" />
          </div>
          
          {/* Right Side - Text Container */}
          <div className="text-container">
            <h3>ABOUT US</h3>
            <h1>Diagnose And Store <br /> Data With Ease</h1>
            <p>
              Our platform features a soothing beige and white background with
              bottle green highlights, providing a calming and professional
              environment for medical professionals.
            </p>
            <div className="icons">
              <FaTruck className="icon1" />
              <FaUserCog className="icon1" />
              <FaProjectDiagram className="icon1" />
            </div>
          </div>
        </div>
      </section>
      <div className="home-container">
      {/* Left Text Section */}
      <div className="text-container1">
        <h2>Endless Possibilities</h2>
        <p>
          Our platform features a soothing beige and white background with
          bottle green highlights, providing a calming and professional
          environment for medical professionals.
        </p>
        <ul>
          <li><span>&#11162;</span> Symptom Diagnosis</li>
          <li><span>&#11162;</span> Data Storage</li>
          <li><span>&#11162;</span> Real-time Monitoring</li>
        </ul>
      </div>

      {/* Right Images Section */}
      <div className="image-container">
        <img src="/images/right_image1.jpeg" alt="Image 1" className="image image1" />
        <img src="/images/right_image2.jpeg" alt="Image 2" className="image image2" />
      </div>
    </div>
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

export default Home;
