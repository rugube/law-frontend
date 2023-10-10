import React, { useContext, useEffect, useState } from "react";
import DashNavbar from "../../components/UserDashboardComponents/DashNavbar/DashNavbar";
import UserProfile from "../../components/UserDashboardComponents/UserProfile/UserProfile";
import JobPost from "../../components/UserDashboardComponents/JobPost/JobPost"; // Import the JobPost component
import JobProposals from "../../components/UserDashboardComponents/JobProposals/JobProposals"; // Import the JobProposals component
import HOST from "../../utils/baseUrl";
import { UserContext } from "../../context/Admin_page/userFunction/userState";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { AuthContext } from "../../context/AuthContext/AuthState";
import Loading from "../../components/AdminCompo/Loading";

const Jobs = () => {
  const [api, contextHolder] = notification.useNotification();

  const { Auth, setAuth } = useContext(AuthContext);
  const { setUserDetails } = useContext(UserContext);

  const [UserData, setUserData] = useState({});
  const [jobs, setJobs] = useState([]); // State to store job postings
  const [proposals, setProposals] = useState([]); // State to store proposals for jobs

  const navigate = useNavigate();

  // Function to open a success notification
  const openNotification = (msg, desc) => {
    api.success({
      message: msg,
      description: desc,
      placement: "top",
    });
  };

  // Function to open an error notification
  const FopenNotification = (msg, desc) => {
    api.error({
      message: msg,
      description: desc,
      placement: "top",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setAuth((prev) => {
        if (prev === false) {
          navigate("/unAuthenticated");
          return false;
        }
        return true;
      });
    }, 2000);

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if (params.authsuccess) {
      GetUserByID(params.userID);
    }
    
    async function GetUserByID(id) {
      try {
        let res = await fetch(`${HOST}/user/${id}`);
        let data = await res.json();
        setUserDetails(data.user);
        setUserData(data.user);
        setAuth(true);
        openNotification("Login Success", "Successfully logged in.");
      } catch (error) {
        console.log(error);
        FopenNotification("Login Failed", "Trouble logging in.");
      }
    }
  }, []);

  return !Auth ? (
    <Loading />
  ) : (
    <div>
      {contextHolder}
      <DashNavbar UserData={UserData} />
      <UserProfile UserData={UserData} />
      {/* Render the JobPost component to allow users to post a job */}
      <JobPost
        UserData={UserData}
        jobs={jobs}
        setJobs={setJobs}
        notification={openNotification}
      />
      {/* Render the JobProposals component to view and accept proposals */}
      <JobProposals
        jobs={jobs}
        proposals={proposals}
        setProposals={setProposals}
        notification={openNotification}
        fnotification={FopenNotification}
      />
    </div>
  );
};

export default Jobs;
