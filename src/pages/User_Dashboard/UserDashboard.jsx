import React, { useContext, useEffect, useState } from "react";
import DashNavbar from "../../components/UserDashboardComponents/DashNavbar/DashNavbar";
import UserProfile from "../../components/UserDashboardComponents/UserProfile/UserProfile";
import AppointmentsArea from "../../components/UserDashboardComponents/AppointmentsArea/AppointmentsArea";
import HOST from "../../utils/baseUrl";
import { UserContext } from "../../context/Admin_page/userFunction/userState";
import { useNavigate } from "react-router-dom";
import { notification, Card, Statistic, Row, Col, Button } from "antd";
import { AuthContext } from "../../context/AuthContext/AuthState";
import Loading from "../../components/AdminCompo/Loading";

const UserDashboard = () => {
  const [api, contextHolder] = notification.useNotification();

  const { Auth, setAuth } = useContext(AuthContext);
  const { setUserDetails } = useContext(UserContext);
  const openNotification = (msg, desc) => {
    api.success({
      message: msg,
      description: desc,
      placement: "top",
    });
  };
  const FopenNotification = (msg, desc) => {
    api.error({
      message: msg,
      description: desc,
      placement: "top",
    });
  };

  let [UserData, setUserData] = useState({});
  const navigate = useNavigate();

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
    <div style={{ padding: "20px" }}>
      <DashNavbar UserData={UserData} style={{ marginBottom: "50px" }} />
      <UserProfile UserData={UserData} style={{ marginBottom: "50px" }} />
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Upcoming Meetings"
            style={{ height: "200px" }}
            extra={
              <Button type="primary">
                View All Meetings
              </Button>
            }
          >
            <p>Meeting 1</p>
            <p>Meeting 2</p>
            <p>Meeting 3</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Total Amount Spent"
            style={{ height: "200px" }}
            extra={
              <Button type="primary">
                View Amount
              </Button>
            }
          >
            <Statistic
              title="Total Amount Spent"
              value={1000} // Replace with actual total amount
              prefix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Jobs Completed"
            style={{ height: "200px" }}
            extra={
              <Button type="primary">
                View All Completed Jobs
              </Button>
            }
          >
            <Statistic
              title="Jobs Completed"
              value={50} // Replace with actual total completed jobs
            />
          </Card>
        </Col>
      </Row>
      
    </div>
  );
};

export default UserDashboard;
