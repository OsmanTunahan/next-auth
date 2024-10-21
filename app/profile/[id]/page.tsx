"use client";

import React from "react";
import axios from "axios";

interface UserProfileProps {
  params: {
    id: string;
  };
}

interface UserInfoProps {
  username: string;
  email: string;
  status: string;
  createdAt: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  username,
  email,
  status,
  createdAt,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      <div className="mb-2">
        <span className="font-semibold">Username:</span> {username}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Email:</span> {email}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Status:</span> {status ? 'Active' : 'Inactive'}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Created At:</span> {createdAt}
      </div>
    </div>
  );
};

export default function UserProfile({ params }: UserProfileProps) {
  const [data, setData] = React.useState({} as any);

  React.useEffect(() => {
    const getUserDetails = async () => {
      const response = await axios.post("/api/find", JSON.stringify({ id: params.id }));
      setData(response.data?.data);
    };

    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <hr className="w-full max-w-md mb-4" />
      <p className="text-4xl mb-4">
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          Hello, <b>{data?.username}</b>!
        </span>
      </p>
      <UserInfo {...data} />
    </div>
  );
}
