import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForgotModal from "./ForgotModal";
import HOST from "../../utils/baseUrl.js";
import { notification } from "antd";
import { AuthContext } from "../../context/AuthContext/AuthState";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [api, contextHolder] = notification.useNotification();

  const FopenNotification = (msg, desc) => {
    api.info({
      message: msg,
      description: desc,
      placement: "top",
    });
  };

  const [value, setValue] = useState("User Email");
  const [imgpath, setImgPath] = useState("Images/Signup/avatar.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = (str) => {
    setValue(str);
    if (str === "User Email") setImgPath("Images/Signup/avatar.png");
    else if (str === "Lawyer Email") setImgPath("Images/Signup/lawyerpng.jpg");
    else setImgPath("Images/Signup/adminpng.png");
  };

  const signIN = async (data) => {
    const response = await fetch(`${HOST}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    const Data = await response.json();
    if (Data.status === "success") {
      localStorage.setItem("token", Data.token);
      setAuth(true);
      FopenNotification("Login Success", "Successfully logged in.");
      setTimeout(() => {
        navigate("/userdashboard");
      }, 1000);
    } else {
      FopenNotification("Invalid Credentials", "Enter valid account details.");
    }
  };

  const handleLawyerLogin = async () => {
    const data = {
      email,
      password,
    };

    const response = await fetch(`${HOST}/lawyer/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (responseData.status === "success") {
      localStorage.setItem("token", responseData.token);
      setAuth(true);
      FopenNotification("Lawyer Login Success", "Successfully logged in as a lawyer.");
      navigate("/lawyerdashboard");
    } else {
      FopenNotification("Invalid Credentials", "Enter valid lawyer account details.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === "User Email") {
      let data = {
        email,
        password,
      };
      signIN(data);
    } else if (value === "Lawyer Email") {
      handleLawyerLogin();
    } else {
      if (email === "admin@gmail.com" && password === "admin") {
        setAuth(true);
        navigate("/admin");
      } else {
        FopenNotification("Invalid Credentials", "Enter valid admin account details.");
      }
    }
  };

  const google = () => {
    localStorage.clear();
    window.open(`${HOST}/auth/google`, "_self");
  };

  return (
    <div className="form-container">
      {contextHolder}
      <p className="logintitle">Login</p>
      <div className="labeldiv">
        <label
          onClick={() => handleClick("User Email")}
          style={{
            backgroundColor: value !== "User Email" ? "#fafafa" : "#B2784A",
            border: "none",
          }}
        >
          User
        </label>
        <label
          onClick={() => handleClick("Lawyer Email")}
          style={{
            backgroundColor: value !== "Lawyer Email" ? "#fafafa" : "#B2784A",
            border: "none",
          }}
        >
          Lawyer
        </label>
        <label
          onClick={() => handleClick("Admin ID")}
          style={{
            backgroundColor: value !== "Admin ID" ? "#fafafa" : "#B2784A",
            border: "none",
          }}
        >
          Admin
        </label>
      </div>
      <div className="userpng">
        <img src={imgpath} alt="" />
      </div>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username" className="fontweightfive">
              {value}
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="username"
              id="username"
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="fontweightfive">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />

            <div className="forgot">
              <div rel="noopener noreferrer" className="yellohover">
                <ForgotModal />
              </div>
            </div>
          </div>
          <button className="signInBtn" type="submit">
            Sign in
          </button>
        </form>
        <div className="social-message">
          <div className="line"></div>
          <p className="message">Login with Google</p>
          <div className="line"></div>
        </div>

        <div className="SocialIcons">
          <div onClick={google}>
            <img
              style={{ width: "30px" }}
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
              alt="icon"
            />
            <label>Google</label>
          </div>
        </div>
        <p className="signup">
          Don't have an account?
          <Link to="/signup" style={{ color: "blue" }}>
            &nbsp; Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
