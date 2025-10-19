import { connectDB } from "@/lib/connectDB";
import { Error, response } from "@/lib/helperResponse";
import { zSchema } from "@/lib/zodSchema";
import otpModel from "@/models/otpModel";
import userModel from "@/models/userModel";

import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        await connectDB()
        const payload = await request.json();
        // Validate input
        const validationSchema = zSchema.pick({
            email: true, otp: true
        })
        const validatedData = validationSchema.safeParse(payload);
        const { email, otp } = validatedData.data;
        if (!validatedData.success) {
            return response(401, false, "Invalid or missing input feild.", validatedData.error)
        }

        // Verify OTP
        const getOtp = await otpModel.findOne({ email, otp });
        if (!getOtp) {
            return response(400, false, "Invalid or expired OTP.");
        }
        //   check user
        const getUser = await userModel.findOne({ deletedAt: null, email }).lean();
        if (!getUser) {
            return response(400, false, "Invalid OTP or email.");
        }

        const loggedInUserData = {
            _id: getUser._id,
            role: getUser.role,
            avatar: getUser.avatar,
            name: getUser.name
        }
        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const token = await new SignJWT(loggedInUserData)
            .setIssuedAt()
            .setExpirationTime('24h')
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret);
        const cookieStore = await cookies()
        cookieStore.set({
            name:'access_Token',
            value:token,
            httpOnly:process.env.NODE_ENV === 'production',
            path:'/',
            secure:process.env.NODE_ENV === 'production',
            sameSite:'lax'

           

        })
         //Delete verified Otp
            await getOtp.deleteOne()
             return response(200, true, "LogIn Successfully.",loggedInUserData);
    } catch (error) {
        return Error(error)
    }
}