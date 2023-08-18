import React from "react";
import Login from "../../components/login/Login";
import "./login.css";
import { Link } from "react-router-dom";
import Gweta from '../../assets/Gweta.png'
const LoginPage = () => {
  return (
    <div className="loginpage">
      <div>
        <Link to="/">
          <img
            className="Aclabsolute"
            src={Gweta}
            alt="Gweta Rangu"
          />
        </Link>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
