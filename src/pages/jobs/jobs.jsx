import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification, Card, Statistic, Row, Col, Button, Badge } from 'antd';
import { UserContext } from "../../context/Admin_page/userFunction/userState";
import { AuthContext } from "../../context/AuthContext/AuthState";
import Loading from "../../components/AdminCompo/Loading";
import HOST from "../../utils/baseUrl";
import UserProfile from "../../components/UserDashboardComponents/UserProfile/UserProfile";
import DashNavbar from "../../components/UserDashboardComponents/DashNavbar/DashNavbar";
import Link from "antd/es/typography/Link";

const UserDashboard = () => {
  const [api, contextHolder] = notification.useNotification();
  const { Auth, setAuth } = useContext(AuthContext);
  const { setUserDetails } = useContext(UserContext);
  const [UserData, setUserData] = useState({});
  const [meetingCount, setMeetingsCount] = useState(0);
  const [latestMeetings, setLatestMeetings] = useState([]);
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
  
    const params = new URLSearchParams(window.location.search);
    if (params.get("authsuccess")) {
      GetUserByID(params.get("userID"));
    }
  
    async function GetUserByID(id) {
      try {
        let res = await fetch(`${HOST}/user/${id}`);
        let data = await res.json();
        setUserDetails(data.user);
        setUserData(data.user);
  
        // Trigger the notification only once after fetching user data
        if (data.user) {
          setAuth(true);
          openNotification("Login Success", "Successfully logged in.");
        } else {
          FopenNotification("Login Failed", "Trouble logging in.");
        }
      } catch (error) {
        console.log(error);
        FopenNotification("Login Failed", "Trouble logging in.");
      }
    }
  
    // Ensure that this block runs only once when the component mounts
    // Add a condition to check if UserData is not empty
    if (UserData && UserData.email) {
      async function getMeetingsCountAndLatestMeetings() {
        try {
          const countResponse = await fetch(
            `${HOST}/appointment/count/userEmail?email=${UserData.email}`
          );
          const countData = await countResponse.json();
  
          if (countData.success) {
            console.log('Meeting Count:', countData.count);
            setMeetingsCount(countData.count);
  
            const latestMeetingsResponse = await fetch(
              `${HOST}/appointment/fetch/userEmail?email=${UserData.email}`
            );
            const latestMeetingsData = await latestMeetingsResponse.json();
  
            if (latestMeetingsData.data) {
              console.log('Latest Meetings:', latestMeetingsData.data);
              setLatestMeetings(latestMeetingsData.data);
            } else {
              console.error('Error fetching latest meetings:', latestMeetingsData.error);
            }
          } else {
            console.error('Error fetching meetings count:', countData.error);
          }
        } catch (error) {
          console.error('Error fetching meetings count:', error);
        }
      }
  
      getMeetingsCountAndLatestMeetings();
    }
  }, []); // Empty dependency array ensures that this effect runs only once on mount
  

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

  return !Auth ? (
    <Loading />
  ) : (
    <div style={{ padding: '20px' }}>
      {contextHolder}
      <DashNavbar UserData={UserData} />
      <UserProfile UserData={UserData} />
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title={
              <Badge count={meetingCount} style={{ backgroundColor: '#52c41a' }}>
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
            {latestMeetings.slice(0, 3).map((meeting, index) => (
              <div key={index}>
                <p>
                  <Link to={`/meeting/${meeting._id}`}>
                    Meeting Date: {meeting.appointment_date?.date}
                  </Link>
                </p>
                <p>Meeting Time: {meeting.appointmentTime}</p>
                <p>Meeting Type: {meeting.meeting_type}</p>
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ marginBottom: '20px' }}>
          <Card
            title="Total Amount Spent"
            style={{ height: '200px', marginTop: '20px' }}
            extra={<Button type="primary">View Amount</Button>}
          >
            <Statistic title="Total Amount Spent" value={1000} prefix="$" />
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

export default UserDashboard;
