// import React from "react";
// import UserProfile from "./UserProfile";

// const UserProfileWrapper = () => {

//   const userData = [
//     {
//       imageUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIRmKUzViUy_qBC99RQ9XxR67HpVE9ZdH24hCXaKe6y9muPQGTZ7mP79c&s",
//       name: "neeraj",
//       email: "neeraj@gmail.com",
//       address: "123 Main Street, Indore, MP",
//     },
//   ];

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       {userData.map((user, index) => (
//         <UserProfile
//           key={index}
//           imageUrl={user.imageUrl}
//           name={user.name}
//           email={user.email}
//           address={user.address}
//         />
//       ))}
//     </div>
//   );
// };

// export default UserProfileWrapper;
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
  console.log("Token:", token);
  console.log("UserID:", userId);
  console.log("Data from API:", data);
  console.log("isLoading:", isLoading);
  console.log("isError:", isError);

  const { firstName, lastName, email, age, mobile, address, image } =
    data.data;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <UserProfile
        imageUrl={
          image
            ? `http://localhost:3300/uploads/${image}`
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
