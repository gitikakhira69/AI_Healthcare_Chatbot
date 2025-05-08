import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session data (adjust as needed)
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    sessionStorage.clear();
    
    // Redirect to login page after logout
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
};

export default Logout;