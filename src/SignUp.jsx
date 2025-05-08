import React, { useState, useEffect } from "react";
import "./Sign.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    qualification: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const goToSignIn = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError("All fields are required!");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Invalid email format!");
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Mobile number must be 10 digits!");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost/Health/care/src/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Sign-up failed");

      alert("Sign-up successful! Redirecting to login...");
      navigate("/signin");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    setError("");
  }, [formData]);

  return (
    <div className="sign-up-container">
      <div className="container">
        <div className="navbar1">
          <div className="logo1">
            <img src="/images/logo.png" height="150px" width="190px" alt="Logo" />
          </div>
        </div>
        <header>Sign Up</header>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="input-field">
            <input type="text" name="firstName" required onChange={handleChange} />
            <label>First Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="lastName" required onChange={handleChange} />
            <label>Last Name</label>
          </div>
          <div className="input-field">
            <input type="date" name="dob" required onChange={handleChange} />
          </div>
          <div className="input-field-radio">
            <label className="gender">Gender :</label>
            <input type="radio" id="male" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
            <label htmlFor="female">Female</label>
            <input type="radio" id="others" name="gender" value="Others" checked={formData.gender === "Others"} onChange={handleChange} />
            <label htmlFor="others">Others</label>
          </div>
          <div className="input-field">
            <input type="text" name="qualification" required onChange={handleChange} />
            <label>Qualification</label>
          </div>
          <div className="input-field">
            <input type="tel" name="mobile" required onChange={handleChange} />
            <label>Mobile No.</label>
          </div>
          <div className="input-field">
            <input type="email" name="email" required onChange={handleChange} />
            <label>Email</label>
          </div>
          <div className="input-field">
            <input 
              type={passwordVisible ? "text" : "password"} 
              name="password" 
              required 
              onChange={handleChange} 
              value={formData.password} 
            />
            <label className={formData.password ? "filled" : ""}>Create Password</label>
            <span className="show" onClick={togglePassword}>
              {passwordVisible ? "HIDE" : "SHOW"}
            </span>
          </div>
          <div className="button">
            <button className="btn" type="submit">SIGN UP</button>
          </div>
        </form>
        <div className="auth">Or sign up with</div>
        <div className="links">
          <div className="facebook"><i className="fab fa-facebook-square"><span>Facebook</span></i></div>
          <div className="google"><i className="fab fa-google-plus-square"><span>Google</span></i></div>
        </div>
        <div className="signup">
          Already have an account? <button className="signupbutton" onClick={goToSignIn}>Sign In</button>
        </div>
      </div>
    </div>

  );
};

export default SignUp;
