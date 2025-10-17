import { emailVerificationLink } from "@/Email/emailVerification";
import { otpEmail } from "@/Email/OtpTemplete";
import { connectDB } from "@/lib/connectDB";
import { Error, otpGenerate, response } from "@/lib/helperResponse";
import { sendMail } from "@/lib/SendMail";
import { zSchema } from "@/lib/zodSchema";
import otpModel from "@/models/otpModel";
import userModel from "@/models/userModel";
import { SignJWT } from "jose";
import z from "zod";

export async function POST(request) {
    try {
       await connectDB();
         const payload = await request.json();
         // Validate input
         const validationSchema = zSchema.pick({
            email: true,
         }).extend({
            password: z.string()
         })
         const validatedData = validationSchema.safeParse(payload);
         const { email, password } = validatedData.data;
         if(!validatedData.success){
            return response(401,false,"Invalid or missing input feild.",validatedData.error)
         }
         // Verify user email 
         const getUser=await userModel.findOne({ deletedAt:null,email}).select('+password');
         if(!getUser){
            return response(400,false,"Invalid login credentials.")
         }
         // Is email verified
            if(!getUser.isEmailVerified){
                 const secret = new TextEncoder().encode(process.env.SECRET_KEY);  
                        const token = await new SignJWT({userId:getUser._id.toString()})
                        .setIssuedAt()
                        .setExpirationTime('1h')
                        .setProtectedHeader({alg:'HS256'})
                        .sign(secret);
                       await sendMail(email,'Email verificaton request from E-Store ',emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`));
                      return response(401,false,"Your email is not verified yet. We have sent you another verification email. Please verify your email to login.") 
            }
            // vrify password
            const isPasswordMatch=await getUser.comparePassword(password);
            if(!isPasswordMatch){
                return response(400,false,"Invalid login credentials.")
            }
          //OTP generation
          await otpModel.deleteMany({email}); // Delete existing OTPs for the email
          const OTP = await otpGenerate();
          const newOtp = new otpModel({ email, otp: OTP });
            await newOtp.save();
        const mailSend = await sendMail(email,'your OTP for login E-store',otpEmail(OTP));
         if(!mailSend.success){
            return response(500,false,"Failed to send OTP email. Please try again.")
         }
         return response(200,true,"OTP sent to your email. Please check your inbox.")
    } catch (error) {
        return Error(error)
    }
}