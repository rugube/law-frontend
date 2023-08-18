import React, { useContext, useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { AuthContext } from "../../context/AuthContext/AuthState"; // Import your AuthContext
import { useNavigate } from "react-router-dom";

export default function App() {
  const { Auth, setAuth } = useContext(AuthContext); // Use the AuthContext
  const navigate = useNavigate();

  // Use useEffect to handle the authentication logic
  useEffect(() => {
    setTimeout(() => {
      setAuth((prev) => {
        if (prev === false) {
          navigate("/unAuthenticated"); // Redirect if not authenticated
          return false;
        }
        return true;
      });
    }, 2000);
  }, [Auth, setAuth, navigate]);

  // Your function to generate a random ID
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

  // Your function to get URL parameters
  function getUrlParams(url = window.location.href) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
  }

  // Get the room ID from URL parameters or generate a random one
  const roomID = getUrlParams().get('roomID') || randomID(5);

  // Function to handle the video call
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

  // Render the video call container
  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
