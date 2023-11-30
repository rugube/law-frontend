import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Admin_page/userFunction/userState";

const LawyerUserProfile = ({ UserData }) => {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("User Email");
  const [name, setName] = useState("User Name");
  const [image, setImg] = useState("");


  const { UserDetails } = useContext(UserContext);
  useEffect(() => {
    setEmail(UserDetails.email);
    setName(UserDetails.name);
    setImg(UserDetails.img);
  }, [UserDetails]);
  return (
    <div className="UserProfileParent">
      <div className="UserProfileFirst">
        <div className="UserProfileLeft" data-aos="fade-right">
          <div className="UserAvatarCard">
            <div>
              <img
                style={{ width: "108px", borderRadius: "50%" }}
                src={
                  image ||
                  "https://www.citypng.com/public/uploads/preview/download-profile-user-round-orange-icon-symbol-png-11639594360ksf6tlhukf.png"
                }
                alt="AvatarImage"
              />
            </div>
            <div>
              <h1>{name}</h1>
              <p>{email}</p>
              <p>Case: IRM</p>
            </div>
          </div>
          <p style={{ color: "grey", fontSize: "12px" }}>
          We Welcome you to our Gweta Rangu, our one-stop shop for all your Legal Services.
          </p>
        </div>
      </div>
      <center>
        <hr style={{ width: "80%" }} />
      </center>
      <div className="UserProfileSecond">
        <Link to="/lawyerdashboard">Dashboard</Link>
        <Link to="/jobpost">Browse Jobs</Link>
        <Link to="/">Work Completed</Link>
        <Link to="/allmeetings">Meetings</Link>
      </div>
    </div>
  );
};

export default LawyerUserProfile;
