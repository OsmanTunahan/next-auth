import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import connectDatabase from "@/lib/database";
import { getDataFromToken } from "@/lib/utils";

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

export async function GET(req: NextRequest) {
  try {
    const userData = getDataFromToken(req);
    const user = await findUser({ _id: userData });
    return NextResponse.json({ status: true, data: user });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error.message },
      { status: 400 }
    );
  }
}