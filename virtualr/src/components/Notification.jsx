import React, { useState } from 'react';
import { getAllNotification } from '../service/notificationService';
import moment from 'moment';


// const notifications = [
//   { id: 1, message: "Your Social Media Unlimited package has been activated!", timestamp: "2 minutes ago" },
//   { id: 2, message: "Your Streaming Package will expire in 3 days.", timestamp: "5 minutes ago" },
//   { id: 3, message: "You have used 80% of your data for the Gaming Package.", timestamp: "10 minutes ago" },
//   { id: 4, message: "New Family Package added! Check it out now.", timestamp: "15 minutes ago" },
//   { id: 5, message: "Your Business Package will renew automatically tomorrow.", timestamp: "20 minutes ago" },
//   { id: 6, message: "Limited time offer on the Unlimited Package!", timestamp: "30 minutes ago" },
//   { id: 7, message: "Your feedback on the Streaming Package has been received.", timestamp: "1 hour ago" },
//   { id: 8, message: "Congratulations! You’ve referred a friend to our service.", timestamp: "2 hours ago" },
// ];


const Notifications = () => {
  const [notifications,setNotifications]=useState(getAllNotification)

  
    //get all Notification
    // const getAllNotifications = () => {
      // getAllNotification
      //     .then((response) => {
      //         setPackages(response.data); 
      //     })
      //     .catch((error) => {
      //         console.log(error);
      //     });

  // };
  return (
    
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center p-4 border border-gray-200 rounded-lg w-[760px] bg-white shadow-md"
          >
            <div className="flex-1">
              <p className="text-gray-800">{notification.message} </p>
              <span className="text-sm text-gray-400">{ moment(notification.createdAt).fromNow()}</span>
              
            </div>
          </div>
        ))}
        
      </div>

      <div className="flex justify-center mt-4">
        <button className="py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
          See All Notifications
        </button>
      </div>
    </div>
  );
};

export default Notifications;
