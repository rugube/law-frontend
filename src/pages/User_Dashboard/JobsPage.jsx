import React, { useState } from 'react';
import { Tabs, Card, Row, Col, Button } from 'antd';
import DashNavbar from '../../components/UserDashboardComponents/DashNavbar/DashNavbar';
import UserProfile from '../../components/UserDashboardComponents/UserProfile/UserProfile';

const { TabPane } = Tabs;

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState('active');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="jobs-page">
      <DashNavbar />
      <UserProfile />
      <div className="jobs-container" style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Jobs</h1>
        <Tabs activeKey={activeTab} onChange={handleTabChange} centered>
          <TabPane tab="Active Jobs" key="active">
            <Row gutter={16} justify="center">
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 1" extra={<Button type="primary">View Details</Button>}>
                  Job details go here.
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 2" extra={<Button type="primary">View Details</Button>}>
                  Job details go here.
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 3" extra={<Button type="primary">View Details</Button>}>
                  Job details go here.
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="Posted Jobs" key="posted">
            <Row gutter={16} justify="center">
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 4" extra={<Button type="primary">View Details</Button>}>
                  Job details go here.
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 5" extra={<Button type="primary">View Details</Button>}>
                  Job details go here.
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 6" extra={<Button type="primary">View Details</Button>}>
                  Job details go here.
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="Completed Jobs" key="completed">
            <Row gutter={16} justify="center">
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 7" extra={<Button type="primary">View Details</Button>}>
                  Job details go here.
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 8" extra={<Button type="primary">View Details</Button>}>
                  Job details go here.
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 9" extra={<Button type="primary">View Details</Button>}>
                  Job details go here.
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default JobsPage;
