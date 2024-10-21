import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import connectDatabase from "@/lib/database";

//connect to the database
connectDatabase();

const findUser = async (_id: any): Promise<any> => {
  try {
    const user = await User.findOne({ _id }).select("-password");
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      throw new Error("User ID is required");
    }

    const user = await findUser({ _id: id });
    return NextResponse.json({ status: true, data: user });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error.message }
    );
  }
}