import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const getDataFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("access_token")?.value ?? "";
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;
    return data?._id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getDataFromToken };
