// src/SignIn.jsx
import React, { useState } from "react";
import "./Sign.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost/Health/care/src/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.status === "success") {
        localStorage.setItem("user_id", data.user_id); // Store session
        alert("Login successful! Redirecting...");
        navigate("/home"); // Redirect to home/dashboard
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    
    <div className="sign-in-container">
      <div className="outer-container">
      <div className="navbar1">
          <div className="logo1">
            <img src="/images/logo.png" height="150px" width="190px" alt="Logo" />
          </div>
        </div>
      <div className="container">
      
        <header>Login</header>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignIn}>
          <div className="input-field">
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="input-field">
            <input 
              type={passwordVisible ? "text" : "password"} 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className={password ? "filled" : ""}>Password</label>
              <span className="show" onClick={togglePassword}>
                {passwordVisible ? "HIDE" : "SHOW"}
              </span>
          </div>
          <div className="button">
            <button className="btn" type="submit">LOGIN</button>
          </div>
        </form>
        <div className="auth">Or sign up with</div>
        <div className="links">
          <div className="facebook"><i className="fab fa-facebook-square"><span>Facebook</span></i></div>
          <div className="google"><i className="fab fa-google-plus-square"><span>Google</span></i></div>
        </div>
        <div className="signup">
        Not a member? <button className="signupbutton" onClick={goToSignUp}>Sign Up</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignIn;

