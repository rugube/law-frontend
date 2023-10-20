import React, { useContext, useEffect, useState } from "react";
import { Tabs } from "antd";
import UserProfile from "./UserProfile/UserProfile";
import DashNavbar from "./DashNavbar/DashNavbar";
import AppointmentsArea from "./AppointmentsArea/AppointmentsArea";
import { UserContext } from "../../context/Admin_page/userFunction/userState";

const { TabPane } = Tabs;

const MeetingsPage = ({ notification, fnotification }) => {
  const { UserDetails } = useContext(UserContext);

  return (
    <div className="MeetingsPage">
      <DashNavbar UserData={UserDetails} />
      <UserProfile UserData={UserDetails} />
      <div className="jobs-container" style={{ padding: '20px' }}>
        <Tabs defaultActiveKey="upcoming">
          <TabPane tab="Upcoming Meetings" key="upcoming">
            <AppointmentsArea notification={notification} fnotification={fnotification} />
          </TabPane>
          <TabPane tab="Meeting History" key="history">
            <AppointmentsArea notification={notification} fnotification={fnotification} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default MeetingsPage;
