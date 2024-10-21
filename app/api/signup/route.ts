import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

interface IData {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

const createNewUser = async (data: IData) => {
  try {
    const user = new User(data);
    return await user.save();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default async function handler(req: NextRequest, res: NextResponse) {
  const { email, password, username, avatar } = await req.json();
  if (!email || !password || !username) {
    return NextResponse.json(
      { status: false, message: "Email, password and username are required" },
      { status: 400 }
    );
  }

  try {
    const newUser = await createNewUser({
      email,
      password,
      username,
      avatar,
    });

    return NextResponse.json({ status: true, data: newUser });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error.message },
      { status: 500 }
    );
  }
}

export { handler as POST };
