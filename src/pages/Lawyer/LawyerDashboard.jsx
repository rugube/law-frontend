import React, { useContext, useEffect, useState } from "react";
import LawyerDashNav from "../../components/lawyers/LawyerDashNav";
import LawyerUserProfile from "../../components/lawyers/LawyerUserProfile";
import HOST from "../../utils/baseUrl";
import { UserContext } from "../../context/Admin_page/userFunction/userState";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { AuthContext } from "../../context/AuthContext/AuthState";
import Loading from "../../components/AdminCompo/Loading";
import { Card, Statistic, Row, Col, Button, Badge } from 'antd';
import Link from "antd/es/typography/Link";

const LawyerDashboard = () => {
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
    console.log("User data in useEffect:", UserData);

    setTimeout(() => {
      setAuth((prev) => {
        if (prev === false) {
          navigate("/unAuthenticated");
          return false;
        }
        return true;
      });
    }, 2000);

    
    const fetchUserData = async (id) => {
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
    };
  
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
  
    if (params.authsuccess) {
      fetchUserData(params.userID);
    }
  }, [UserData]);

  

  return !Auth ? (
    <Loading />
  ) : (
    <div style={{ padding: '20px' }} >
      {contextHolder}
      <LawyerDashNav UserData={UserData} />
      <LawyerUserProfile UserData={UserData} />
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={8}>
        <Card
  title={
    <Badge style={{ backgroundColor: '#52c41a' }}>
      Upcoming Meetings
    </Badge>
    }
    style={{ height: '200px', marginTop: '20px' }}
    extra={
      <Link to="/allmeetings">
        <Button type="primary">View Meetings</Button>
      </Link>
    }
  >
</Card>

        </Col>
        <Col xs={24} sm={12} md={8} style={{ marginBottom: '20px' }}>
          <Card
            title="Total Amount Earned"
            style={{ height: '200px', marginTop: '20px' }}
            extra={<Button type="primary">View Amount</Button>}
          >
            <Statistic title="Total Amount Earned" value={1000} prefix="$" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ marginBottom: '20px' }}>
          <Card
            title="Jobs Completed"
            style={{ height: '200px', marginTop: '20px' }}
            extra={
              <Link to="/alljobs">
                <Button type="primary">View Jobs</Button>
              </Link>
            }
          >
            <Statistic title="Jobs Completed" value={50} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LawyerDashboard;
