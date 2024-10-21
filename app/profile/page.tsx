"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";

interface IData {
  _id: string;
  username: string;
  email: string;
  password: string;
  status: boolean;
  avatar?: string;
}

export default function Profile() {
  const [data, setData] = useState() as [IData, (data: IData) => void];
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      toast.success("Logout successful, redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
      toast.error("Could not log out, please try again");
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/profile");
    setData(response.data?.data);
  };

  useEffect(() => {
    //get user details
    getUserDetails();

    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/profile");
        if (response.data?.status !== true) {
          toast.error("You are not logged in, redirecting...");
          router.push("/login");
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {data ? (
          <>
            <p className="text-4xl">
              Welcome,{" "}
              <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
                {data.username}
              </span>
              <br />
              <br />
              <center>
                <Link
                  href={`/profile/${data?._id}`}
                  style={{ textDecoration: "none" }}
                  className="font-medium text-red-600 hover:underline dark:text-red-500"
                >
                  Get User Details
                </Link>
                <br />
                <button
                  onClick={logout}
                  style={{ textDecoration: "none" }}
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                >
                  Logout
                </button>
              </center>
            </p>
          </>
        ) : (
          <>
            <p>Login required!</p>
          </>
        )}
      </div>
    </>
  );
}
