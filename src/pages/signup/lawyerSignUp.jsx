import React, { useState } from "react";
import "./signupPage.css";
import { Link, useNavigate } from "react-router-dom";
import HOST from "../../utils/baseUrl";
import { notification } from "antd";
import Gweta from "../../assets/Gweta.png";

const LawyerSignUpPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const SopenNotification = (msg, desc) => {
    api.info({
      message: msg,
      description: desc,
      placement: "top",
    });
  };

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [gender, setGender] = useState("");
  let [password, setPassword] = useState("");
  let [address, setAddress] = useState("");
  let [bio, setBio] = useState("");
  let [skills, setSkills] = useState("");
  let [profession, setProfession] = useState("");
  let [image, setImage] = useState("");
  let [price, setPrice] = useState("");
  let [languages, setLanguages] = useState("");
  let [rating, setRating] = useState("");
  let [experience, setExperience] = useState("");
  let [rank, setRank] = useState("");

  const signUp = async (data) => {
    const response = await fetch(`${HOST}/lawyer/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      SopenNotification("Signup Successful", "Please Verify with OTP");
      setTimeout(() => {
        navigate("/verifyOTP");
      }, 1000);
    } else if (json.exist === true) {
      SopenNotification("Already Signed In", json.Message);
    } else {
      console.log(json.Message);
      SopenNotification("Info!", json.Message);
    }
  };

  const handleSubmit = () => {
    let data = {
      email,
      password,
      name,
      gender,
      phone,
      address,
      bio,
      skills,
      profession,
      image,
      price,
      languages,
      rating,
      experience,
      rank,
    };
    signUp(data);
  };

  return (
    <div className="signUpdiv">
      {contextHolder}
      <Link to="/">
        <img className="Aclabsolute" src={Gweta} alt="Gweta Rangu" />
      </Link>
      <div>
        <form
          className="Signupform"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <p style={{ color: "grey", fontSize: "13px" }}>
            Signup to Ace Legal Services
          </p>
          <div className="side-by-side">
            {/* Left Column */}
            <div className="column">
              <input
                onChange={(event) => {
                  setName(event.target.value);
                }}
                type="text"
                className="SignupUserName"
                placeholder="&nbsp;&nbsp;Username"
                required
              />
              <input
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="email"
                className="SignupEmail"
                placeholder="&nbsp;&nbsp;Email"
                required
              />
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
                className="SignupPass"
                placeholder="&nbsp;&nbsp;Password"
                required
              />
              <input
                onChange={(event) => {
                  setGender(event.target.value);
                }}
                type="text"
                className="SignupGender"
                placeholder="&nbsp;&nbsp;Gender"
                required
              />
              <input
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                type="number"
                className="SignupPhone"
                placeholder="&nbsp;&nbsp;Phone Number"
                required
              />
              <input
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                type="text"
                className="SignupAddress"
                placeholder="&nbsp;&nbsp;Address"
                required
              />
              <input
                onChange={(event) => {
                  setBio(event.target.value);
                }}
                type="text"
                className="SignupBio"
                placeholder="&nbsp;&nbsp;Bio"
                required
              />
            </div>

            {/* Right Column */}
            <div className="column">
              <input
                onChange={(event) => {
                  setSkills(event.target.value);
                }}
                type="text"
                className="SignupSkills"
                placeholder="&nbsp;&nbsp;Skills"
                required
              />
              <input
                onChange={(event) => {
                  setProfession(event.target.value);
                }}
                type="text"
                className="SignupProfession"
                placeholder="&nbsp;&nbsp;Profession"
                required
              />
              <input
                onChange={(event) => {
                  setImage(event.target.value);
                }}
                type="text"
                className="SignupImage"
                placeholder="&nbsp;&nbsp;Image"
                required
              />
              <input
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
                type="number"
                className="SignupPrice"
                placeholder="&nbsp;&nbsp;Price"
                required
              />
              <input
                onChange={(event) => {
                  setLanguages(event.target.value);
                }}
                type="text"
                className="SignupLanguages"
                placeholder="&nbsp;&nbsp;Languages"
                required
              />
              <input
                onChange={(event) => {
                  setRating(event.target.value);
                }}
                type="number"
                className="SignupSkills"
                placeholder="&nbsp;&nbsp;Rating"
                required
              />
              <input
                onChange={(event) => {
                  setExperience(event.target.value);
                }}
                type="text"
                className="SignupExperience"
                placeholder="&nbsp;&nbsp;Experience"
                required
              />
              <input
                onChange={(event) => {
                  setRank(event.target.value);
                }}
                type="number"
                className="SignupRank"
                placeholder="&nbsp;&nbsp;Rank"
                required
              />
            </div>
          </div>

          <span className="alreadyacc">
            Already have an account ?
            <Link className="SignInSmol" to="/login">
              &nbsp; Sign in
            </Link>
          </span>

          <input
            type="submit"
            value="Continue"
            style={{ cursor: "pointer", margin: "0" }}
            className="ContinueRegis"
          />

          <div className="social-message">
            <div className="line">-</div>
            <p className="message">Login with social accounts</p>
            <div className="line">-</div>
          </div>
          <div className="SocialIcons">
            <div>
              <img
                style={{ width: "30px" }}
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                alt="icon"
              />
              <label>Google</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LawyerSignUpPage;
