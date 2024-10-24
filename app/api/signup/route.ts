import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import connectDatabase from "@/lib/database";

//connect to the database
connectDatabase();

interface IData {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

const createNewUser = async (data: IData) => {
  try {
    //check if user already exists
    if (!(await checkExistingUser(data.email))) {
      throw new Error("User already exists");
    }

    const user = new User(data);
    return await user.save();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const checkExistingUser = async (email: string) => {
  try {
    const findUser = await User.findOne({ email });
    return !findUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, username, avatar } = body;

    if (!email || !password || !username) {
      throw new Error("Email, password, and username are required");
    }

    const newUser = await createNewUser({ email, password, username, avatar });

    return NextResponse.json({ status: true, data: newUser });
  } catch (error: any) {
    if (error.message === "Unexpected end of JSON input") {
      return NextResponse.json(
        { status: false, message: "Invalid or missing JSON body" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { status: false, message: error.message },
      { status: 400 }
    );
  }
}