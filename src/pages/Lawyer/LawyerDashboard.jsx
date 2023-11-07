import React, { useContext, useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Button, Badge } from 'antd';
import {
  FileTextOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { AuthContext } from '../../context/AuthContext/AuthState';
import LawyerContext  from '../../context/Admin_page/lawyercontext/lawyerContext';
import DashNavbar from '../../components/UserDashboardComponents/DashNavbar/DashNavbar';
import UserProfile from '../../components/UserDashboardComponents/UserProfile/UserProfile';
import { Redirect } from 'react-router-dom';

const LawyerDashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { lawyerDetails, getLawyers, lawyers, loading, deleteLawyer } = useContext(LawyerContext);

  const [meetingCount, setMeetingCount] = useState(0);

  useEffect(() => {
    // Fetch latest meetings here and update meetingCount
    // Replace this mock data with actual data
    const latestMeetings = []; // Replace with actual data
    const count = latestMeetings.length; // Get the count of meetings
    setMeetingCount(count); // Update the meetingCount state
  }, []);

  return isAuthenticated ? (
    <div>
      <DashNavbar />
      <UserProfile userData={lawyerDetails} />
      <h1 className="dashboard-title">Lawyer Dashboard</h1>
      <Row gutter={[16, 16]} className="dashboard-cards">
        <Col xs={24} sm={12} md={8}>
          <Card
            className="dashboard-card"
            cover={<FileTextOutlined style={{ fontSize: '64px' }} />}
            title={
              <Badge count={meetingCount} style={{ backgroundColor: '#52c41a' }}>
                New Appointments
              </Badge>
            }
            extra={
              <Button type="primary">View Appointments</Button>
            }
          >
            {/* Render appointment data */}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            className="dashboard-card"
            title="Cases in Progress"
            extra={
              <Button type="primary">View Cases</Button>
            }
          >
            <Statistic
              title="Total Cases"
              value={lawyerDetails.casesInProgress} // Replace with actual case count
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            className="dashboard-card"
            cover={<MessageOutlined style={{ fontSize: '64px' }} />}
            title="Client Messages"
            extra={
              <Button type="primary">View Messages</Button>
            }
          >
            <Statistic
              title="Unread Messages"
              value={lawyerDetails.unreadMessages} // Replace with actual unread message count
            />
          </Card>
        </Col>
      </Row>
    </div>
  ) : (
    // Redirect to the login page if not authenticated
    <Redirect to="/login" />
  );
};

export default LawyerDashboard;
