import { connectDB } from "@/lib/connectDB";
import { Error, response } from "@/lib/helperResponse";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        await connectDB();
        const CookieStore = await cookies();
        CookieStore.delete('access_Token')
        return response(200, true, "Logged out successfully.");
    } catch (error) {
        return Error(error);
    }
}