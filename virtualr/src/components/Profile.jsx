import React, { useState, useEffect } from "react";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); // Get the access token from local storage

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/viewProfile/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }

        const data = await response.json();
        setUserDetails(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchProfileData();
    } else {
      setError("User is not authenticated.");
      setLoading(false);
    }
  }, [userId, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(userDetails.users);

  return (
    <div className="max-w-[800px] mx-auto p-6">
      {userDetails ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-800">User Profile</h1>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg">
              <strong>Name:</strong> {userDetails.users.name}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {userDetails.users.email}
            </p>
            <p className="text-lg">
              <strong>Phone:</strong> {userDetails.users.phoneNumber}
            </p>
            <p className="text-lg">
              <strong>User Type:</strong> {userDetails.users.role}
            </p>
            {/* Add more fields as necessary */}
          </div>
        </div>
      ) : (
        <div>No user details available.</div>
      )}
    </div>
  );
};

export default Profile;
