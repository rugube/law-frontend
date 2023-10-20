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
      <UserProfile UserData={UserDetails} />
      <DashNavbar UserData={UserDetails} />

      <h1>Meetings</h1>
      <Tabs defaultActiveKey="upcoming">
        <TabPane tab="Upcoming Meetings" key="upcoming">
          <AppointmentsArea notification={notification} fnotification={fnotification} />
        </TabPane>
        <TabPane tab="Meeting History" key="history">
          <AppointmentsArea notification={notification} fnotification={fnotification} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MeetingsPage;
