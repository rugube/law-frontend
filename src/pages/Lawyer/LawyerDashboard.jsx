import React, { useContext, useEffect, useState } from 'react';
import DashNavbar from '../../components/UserDashboardComponents/DashNavbar/DashNavbar';
import UserProfile from '../../components/UserDashboardComponents/UserProfile/UserProfile';
import { notification, Card, Statistic, Row, Col, Button, Badge } from 'antd';
import { AuthContext } from '../../context/AuthContext/AuthState';
import Loading from '../../components/AdminCompo/Loading';
import axios from 'axios'; 
import { useNavigate, Link } from 'react-router-dom';

const LawyerDashboard = () => {
  const [api, contextHolder] = notification.useNotification();

  const { isAuthenticated } = useContext(AuthContext);
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

  const [lawyerDetails, setLawyerDetails] = useState({});
  const navigate = useNavigate();
  const [meetingCount, setMeetingCount] = useState(0);
  const [latestMeetings, setLatestMeetings] = useState([]);
  const [lawyerCards, setLawyerCards] = useState([]); // State to store lawyer cards

  useEffect(() => {
    // Fetch the latest meetings when the component mounts
    axios.get('YOUR_API_ENDPOINT_HERE').then((response) => {
      setLatestMeetings(response.data);
    });

    // Fetch lawyer cards from your API
    axios.get('YOUR_LAWYER_CARDS_API_ENDPOINT').then((response) => {
      setLawyerCards(response.data);
    });
  }, []);

  const handleMeetingIncrement = () => {
    setMeetingCount(meetingCount + 1);
  };

  return !isAuthenticated ? (
    <Loading />
  ) : (
    <div style={{ padding: '20px' }}>
      {contextHolder}
      <DashNavbar />
      <UserProfile userData={lawyerDetails} style={{ marginBottom: '20px' }} />
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
      {/* Display lawyer cards */}
      {lawyerCards.map((lawyerCard, index) => (
        <Card key={index} style={{ marginBottom: '20px' }}>
          <p>Name: {lawyerCard.name}</p>
          <p>Specialty: {lawyerCard.specialty}</p>
          <p>Experience: {lawyerCard.experience}</p>
          {/* Add more fields as needed */}
        </Card>
      ))}
    </div>
  );
};

export default LawyerDashboard;
