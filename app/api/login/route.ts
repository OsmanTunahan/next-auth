import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import connectDatabase from "@/lib/database";

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

    if (!(await checkUser(email, password))) {
      throw new Error("User does not exist");
    }

    return NextResponse.json({ status: true });
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