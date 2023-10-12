import React, { useContext, useEffect, useState } from "react";
import DashNavbar from "../../components/UserDashboardComponents/DashNavbar/DashNavbar";
import UserProfile from "../../components/UserDashboardComponents/UserProfile/UserProfile";
import HOST from "../../utils/baseUrl";
import { UserContext } from "../../context/Admin_page/userFunction/userState";
import { AuthContext } from "../../context/AuthContext/AuthState";
import Loading from "../../components/AdminCompo/Loading";
import { notification } from "antd";
import JobProposals from "../../components/UserDashboardComponents/JobProposals/JobProposals";

const ViewProposalsPage = () => {
  const [api, contextHolder] = notification.useNotification();

  const { Auth, setAuth } = useContext(AuthContext);
  const { setUserDetails } = useContext(UserContext);

  const [UserData, setUserData] = useState({});
  // State to store proposals for jobs (You can adapt this as needed)
  const [proposals, setProposals] = useState([]);

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

  // Function to open a success notification (You can adapt this as needed)
  const openNotification = (msg, desc) => {
    api.success({
      message: msg,
      description: desc,
      placement: "top",
    });
  };

  // Function to open an error notification (You can adapt this as needed)
  const FopenNotification = (msg, desc) => {
    api.error({
      message: msg,
      description: desc,
      placement: "top",
    });
  };

  return !Auth ? (
    <Loading />
  ) : (
    <div>
      {contextHolder}
      <DashNavbar UserData={UserData} />
      <UserProfile UserData={UserData} />
      {/* Render the component to display job proposals */}
      <JobProposals
        UserData={UserData}
        proposals={proposals}
        setProposals={setProposals}
        notification={openNotification}
      />
    </div>
  );
};

export default ViewProposalsPage;
