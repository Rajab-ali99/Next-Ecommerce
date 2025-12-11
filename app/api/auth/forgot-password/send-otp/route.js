import { otpEmail } from "@/Email/OtpTemplete";
import { connectDB } from "@/lib/connectDB";
import { Error, otpGenerate, response } from "@/lib/helperResponse";
import { sendMail } from "@/lib/SendMail";
import { zSchema } from "@/lib/zodSchema";
import otpModel from "@/models/otpModel";
import userModel from "@/models/userModel";

export async function POST(request) {
    try {
        await connectDB()
        const payload = await request.json();
        // Validate input
        const validationSchema = zSchema.pick({
            email: true,
        })
        const validatedData = validationSchema.safeParse(payload);
        const { email } = validatedData.data;
        if (!validatedData.success) {
            return response(401, false, "Invalid or missing input feild.", validatedData.error)
        }
        const getuser = await userModel.findOne({ deletedAt: null, email }).lean()
        if (!getuser) {
            return response(400, false, "User with this email does not exist.")
        }
        //send otp
        await otpModel.deleteMany({ email }); // Delete existing OTPs for the email
        const OTP = await otpGenerate();
        const newOtp = new otpModel({ email, otp: OTP });
        await newOtp.save();
        const mailSend = await sendMail(email, 'your OTP for login E-store', otpEmail(OTP));
        if (!mailSend.success) {
            return response(500, false, "Failed to send OTP email. Please try again.")
        }
        return response(200, true, "OTP sent to your email. Please check your inbox.")
    } catch (error) {
        return Error(error)
    }
}