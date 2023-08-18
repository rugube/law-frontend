// VideoCallPage.js
import React from 'react';
import { navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthState';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
  let result = '';
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  var maxPos = chars.length;
  len = len || 5;
  for (var i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

function VideoCallPage() {
  const { isAuthenticated } = AuthContext();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const roomID = getUrlParams().get('roomID') || randomID(5);

  const myMeeting = async (element) => {
    const appID = 1675037019;
    const serverSecret = "7940e8d348ae90d085fc2f132c905080";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };

  return (
    <div className="myCallContainer" ref={myMeeting} style={{ width: '100vw', height: '100vh' }}></div>
  );
}

export default VideoCallPage;
