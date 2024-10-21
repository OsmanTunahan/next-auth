import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import connectDatabase from "@/lib/database";
import jwt from "jsonwebtoken";

//connect to the database
connectDatabase();

const checkUser = async (email: string, password: string) => {
  try {
    const findUser = await User.findOne({ email, password });
    return findUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await checkUser(email, password);
    if (!user) {
      throw new Error("User does not exist");
    }

    const newToken = jwt.sign(
      {
        _id: user?._id,
        username: user?.username,
        email: user?.email,
        avatar: user?.avatar,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "1h",
        algorithm: "HS256",
      }
    );

    return NextResponse.json({
      status: true,
      message: "Login successful",
      token: newToken,
    }, {
        status: 200,
        headers: {
          "Set-Cookie": `access_token=${newToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; Secure;`,
        },
    });
  } catch (error: any) {
    if (error.message === "Unexpected end of JSON input") {
      return NextResponse.json(
        { status: false, message: "Invalid or missing JSON body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { status: false, message: error.message },
      { status: 500 }
    );
  }
}
