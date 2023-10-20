import React, { useState } from 'react';
import { Tabs, Card, Row, Col } from 'antd';
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
      <div className="jobs-container">
        <h1 style={{ textAlign: 'center' }}>Jobs</h1>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          animated
          centered // Align tab headings in the center
        >
          <TabPane tab="Active Jobs" key="active">
            <Row gutter={16} justify="center"> {/* Center-align the cards */}
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 1" extra={<a href="#">Details</a>}>
                  Job details go here.
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 2" extra={<a href="#">Details</a>}>
                  Job details go here.
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 3" extra={<a href="#">Details</a>}>
                  Job details go here.
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="Posted Jobs" key="posted">
            <Row gutter={16} justify="center">
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 4" extra={<a href="#">Details</a>}>
                  Job details go here.
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 5" extra={<a href="#">Details</a>}>
                  Job details go here.
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 6" extra={<a href="#">Details</a>}>
                  Job details go here.
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="Completed Jobs" key="completed">
            <Row gutter={16} justify="center">
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 7" extra={<a href="#">Details</a>}>
                  Job details go here.
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 8" extra={<a href="#">Details</a>}>
                  Job details go here.
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card title="Job Title 9" extra={<a href="#">Details</a>}>
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
