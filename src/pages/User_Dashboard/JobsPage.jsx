import React, { useState } from 'react';
import { Tabs, Card, Row, Col } from 'antd';
import DashNavbar from '../../components/UserDashboardComponents/DashNavbar/DashNavbar';// Import DashNavbar
import UserProfile from '../../components/UserDashboardComponents/UserProfile/UserProfile'; // Import UserProfile

const { TabPane } = Tabs;

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState('active');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="jobs-page">
      <DashNavbar /> {/* Include the DashNavbar component here */}
      <UserProfile /> {/* Include the UserProfile component here */}
      <h1>Jobs</h1>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Active Jobs" key="active">
          <Row gutter={16}>
            {/* Replace with real data for active jobs */}
            <Col span={8}>
              <Card title="Job Title" extra={<a href="#">Details</a>}>
                Job details go hereR
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Job Title" extra={<a href="#">Details</a>}>
                Job details go here.
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Job Title" extra={<a href="#">Details</a>}>
                Job details go here.
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Posted Jobs" key="posted">
          <Row gutter={16}>
            {/* Replace with real data for posted jobs */}
            <Col span={8}>
              <Card title="Job Title" extra={<a href="#">Details</a>}>
                Job details go here.
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Job Title" extra={<a href="#">Details</a>}>
                Job details go here.
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Job Title" extra={<a href="#">Details</a>}>
                Job details go here.
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Completed Jobs" key="completed">
          <Row gutter={16}>
            {/* Replace with real data for completed jobs */}
            <Col span={8}>
              <Card title="Job Title" extra={<a href="#">Details</a>}>
                Job details go here.
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Job Title" extra={<a href="#">Details</a>}>
                Job details go here.
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Job Title" extra={<a href="#">Details</a>}>
                Job details go here.
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default JobsPage;
