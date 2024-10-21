"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

export default function Home() {
  const router = useRouter();

  //check if the user is logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/profile");
        if (response.data?.status === true) {
          toast.success("You are already logged in, redirecting...");
          setTimeout(() => router.push("/profile"), 1500);
        }
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <>
      <p>Hello, world!</p>
    </>
  );
}
