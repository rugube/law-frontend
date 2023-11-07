import React, { useContext, useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Button, Badge } from 'antd';
import { FileTextOutlined, MessageOutlined } from '@ant-design/icons';
import { AuthContext } from '../../context/AuthContext/AuthState';
import { useNavigate } from 'react-router-dom';

const LawyerDashboard = () => {
  const { Auth } = useContext(AuthContext);
  const [meetingCount, setMeetingCount] = useState(0);

  useEffect(() => {
    // Fetch latest meetings here and update meetingCount
    // Replace this mock data with actual data
    const latestMeetings = []; // Replace with actual data
    const count = latestMeetings.length; // Get the count of meetings
    setMeetingCount(count); // Update the meetingCount state
  }, []);

  const navigate = useNavigate();

  return !Auth ? (
    <div>q
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
              <Button type="primary" onClick={() => navigate('/cases')}>View Cases</Button>
            }
          >
            <Statistic
              title="Total Cases"
              value={10} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            className="dashboard-card"
            cover={<MessageOutlined style={{ fontSize: '64px' }} />}
            title="Client Messages"
            extra={
              <Button type="primary" onClick={() => navigate('/messages')}>View Messages</Button>
            }
          >
            <Statistic
              title="Unread Messages"
              value={10} 
            />
          </Card>
        </Col>
      </Row>
    </div>
  ) : (
    navigate('/login')
  );
};

export default LawyerDashboard;
