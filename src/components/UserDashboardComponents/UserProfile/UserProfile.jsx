import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import { NavLink } from "react-router-dom"; // Changed 'Link' to 'NavLink'
import { UserContext } from "../../../context/Admin_page/userFunction/userState";

const UserProfile = ({ UserData }) => {
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
            We Welcome you to our Gweta Rangu, our one-stop shop for all your Legal Services
          </p>
        </div>
        <div className="UserProfileRight" data-aos="fade-left">
          <NavLink to="/lawyers" activeClassName="active"> {/* Changed 'Link' to 'NavLink' */}
            <button className="BigBAPBTN">Book an Appointment +</button>
          </NavLink>
        </div>
        <div className="UserProfileRight" data-aos="fade-left">
          <NavLink to="/alljobs" activeClassName="active"> {/* Changed 'Link' to 'NavLink' */}
            <button className="BigBAPBTN">Start Video Call</button>
          </NavLink>
        </div>
        <div className="UserProfileRight" data-aos="fade-left">
          <NavLink to="/jobs" activeClassName="active"> {/* Changed 'Link' to 'NavLink' */}
            <button className="BigBAPBTN">Post A Job</button>
          </NavLink>
        </div>
      </div>
      <center>
        <hr style={{ width: "80%" }} />
      </center>
      <div className="UserProfileSecond">
        <NavLink to="/userdashboard" activeClassName="active"> {/* Changed 'Link' to 'NavLink' */}
          Dashboard
        </NavLink>
        <NavLink to="/jobs" activeClassName="active"> {/* Changed 'Link' to 'NavLink' */}
          Post A Job
        </NavLink>
        <NavLink to="/proposals" activeClassName="active"> {/* Changed 'Link' to 'NavLink' */}
          View Proposals
        </NavLink>
        <NavLink to="/appointment" activeClassName="active"> {/* Changed 'Link' to 'NavLink' */}
          Meetings
        </NavLink>
      </div>
    </div>
  );
};

export default UserProfile;
