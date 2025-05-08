import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Chatbot from "./Chatbot";
import AboutUs from "./About";
import ContactForm from "./ContactForm";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Logout from "./Logout";
import PatientData from "./PatientData";

const App = () => {
  return (
    <>
      <ConditionalNavbar /> 
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/patient-data" element={<PatientData />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

// Function to conditionally render Navbar
const ConditionalNavbar = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/signup"]; // Hide navbar on SignIn & SignUp pages

  return !hideNavbarRoutes.includes(location.pathname) ? <Navbar /> : null;
};

export default App;
