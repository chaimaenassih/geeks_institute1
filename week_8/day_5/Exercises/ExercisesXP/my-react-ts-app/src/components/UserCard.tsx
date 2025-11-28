import React from "react";

interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  name = "Unknown",
  age = 0,
  role = "Guest",
}) => {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        width: "200px",
        marginBottom: "10px",
      }}
    >
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
};

export default UserCard;
