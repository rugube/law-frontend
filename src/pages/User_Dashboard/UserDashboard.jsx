import React, { useContext, useEffect, useState } from 'react';
import DashNavbar from '../../components/UserDashboardComponents/DashNavbar/DashNavbar';
import UserProfile from '../../components/UserDashboardComponents/UserProfile/UserProfile';
import HOST from '../../utils/baseUrl';
import { UserContext } from '../../context/Admin_page/userFunction/userState';
import { useNavigate, Link } from 'react-router-dom';
import { notification, Card, Statistic, Row, Col, Button, Badge } from 'antd';
import { AuthContext } from '../../context/AuthContext/AuthState';
import Loading from '../../components/AdminCompo/Loading';
import axios from 'axios'; // Import Axios

const UserDashboard = () => {
  const [api, contextHolder] = notification.useNotification();

  const { Auth, setAuth } = useContext(AuthContext);
  const { setUserDetails } = useContext(UserContext);
  const openNotification = (msg, desc) => {
    api.success({
      message: msg,
      description: desc,
      placement: 'top',
    });
  };
  const FopenNotification = (msg, desc) => {
    api.error({
      message: msg,
      description: desc,
      placement: 'top',
    });
  };

  let [UserData, setUserData] = useState({});
  const navigate = useNavigate();
  const [meetingCount, setMeetingCount] = useState(0);
  const [latestMeetings, setLatestMeetings] = useState([]); // State to store latest meetings

  useEffect(() => {
    setTimeout(() => {
      setAuth((prev) => {
        if (prev === false) {
          navigate('/unAuthenticated');
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
        openNotification('Login Success', 'Successfully logged in.');
      } catch (error) {
        console.log(error);
        FopenNotification('Login Failed', 'Trouble logging in.');
      }
    }

    // Fetch the latest meetings when the component mounts
    axios.get(`${HOST}/appointments/latest`).then((response) => {
      setLatestMeetings(response.data);
    });
  }, []);

  const handleMeetingIncrement = () => {
    setMeetingCount(meetingCount + 1);
  };

  return !Auth ? (
    <Loading />
  ) : (
    <div style={{ padding: '20px' }}>
      {contextHolder}
      <DashNavbar UserData={UserData} style={{ marginBottom: '20px' }} />
      <UserProfile UserData={UserData} style={{ marginBottom: '20px' }} />
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
            {latestMeetings.map((meeting, index) => (
              <div key={index}>
                <p>Meeting Date: {meeting.appointment_date?.date}</p>
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
            extra={
              <Button type="primary">View Amount</Button>
            }
          >
            <Statistic
              title="Total Amount Spent"
              value={1000} // Replace with actual total amount
              prefix="$"
            />
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
