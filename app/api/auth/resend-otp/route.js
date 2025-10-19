import { otpEmail } from "@/Email/OtpTemplete";
import { connectDB } from "@/lib/connectDB";
import { Error, otpGenerate, response } from "@/lib/helperResponse";
import { sendMail } from "@/lib/SendMail";
import { zSchema } from "@/lib/zodSchema";
import otpModel from "@/models/otpModel";

export async function POST(request) {
    try {
        await connectDB();
        const payload = await request.json();
        // Validate input
        const validationSchema = zSchema.pick({
            email: true
        })
        const validatedData = validationSchema.safeParse(payload);
        const { email } = validatedData.data;
        if (!validatedData.success) {
            return response(401, false, "Invalid or missing input feild.", validatedData.error)
        }
        //Delete all otps
        await otpModel.deleteMany({ email })
        const otp =await otpGenerate()
        const newOtp = await new otpModel({ email, otp })
        await newOtp.save()
        const mailSend = await sendMail(email, 'your OTP for login E-store', otpEmail(otp));
        if (!mailSend.success) {
            return response(500, false, "Failed to send OTP. Please try again.")
        }
        return response(200, true, "OTP sent to your email. Please check your inbox.")
    } catch (error) {
        return Error(error)
    }
}