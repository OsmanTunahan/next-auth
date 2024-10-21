import { NextRequest, NextResponse } from "next/server";
import connectDatabase from "@/lib/database";

export async function GET(req: NextRequest) {
  try {
    if (!req.cookies.get("access_token")) {
      throw new Error("You are not logged in");
    }

    return NextResponse.json(
      {
        success: true,
        message: "You have been logout successfully",
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": "access_token=; HttpOnly; Path=/; Max-Age=0",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error.message },
      { status: 400 }
    );
  }
}
