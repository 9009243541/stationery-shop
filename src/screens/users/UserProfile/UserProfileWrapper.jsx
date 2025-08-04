
import React from "react";
import { jwtDecode } from "jwt-decode";
import UserProfile from "./UserProfile";
import { useGetUserProfileQuery } from "../../../slice/UserAuthApiSlice";

const UserProfileWrapper = () => {
  const token = localStorage.getItem("token");

  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded._id;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const { data, isLoading, isError } = useGetUserProfileQuery(userId, {
    skip: !userId,
  });

  if (isLoading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load user profile
      </div>
    );
  }

  const { firstName, lastName, email, age, mobile, address, image } =
    data.data;
     const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      <UserProfile
        imageUrl={
          image
            ? `${API_BASE_URL}/uploads/${image}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIRmKUzViUy_qBC99RQ9XxR67HpVE9ZdH24hCXaKe6y9muPQGTZ7mP79c&s"
        }
        name={`${firstName} ${lastName}` || "No Name"}
        age={age || "No Age"}
        mobile={mobile}
        email={email || "No Email"}
        address={address || "No Address"}
        userId={userId}
      />
    </div>
  );
};

export default UserProfileWrapper;
