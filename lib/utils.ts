import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("access_token")?.value ?? "";
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export { getDataFromToken };