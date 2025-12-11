import { connectDB } from "@/lib/connectDB";
import { Error, response } from "@/lib/helperResponse";
import { zSchema } from "@/lib/zodSchema";
import otpModel from "@/models/otpModel";
import userModel from "@/models/userModel";

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
         //   check user
        const getUser = await userModel.findOne({ deletedAt: null, email }).lean();
        if (!getUser) {
            return response(400, false, "Invalid OTP or email.");
        }

        // Verify OTP
        const getOtp = await otpModel.findOne({ email, otp });
        if (!getOtp) {
            return response(400, false, "Invalid or expired OTP.");
        }
       

       
         //Delete verified Otp
            await getOtp.deleteOne()
             return response(200, true, "OTP verified.Setup your new password.",);
    } catch (error) {
        return Error(error)
    }
}