import { connectDB } from "@/lib/connectDB";
import { Error, response } from "@/lib/helperResponse";
import { sendMail } from "@/lib/SendMail";
import { zSchema } from "@/lib/zodSchema";
import userModel from "@/models/userModel";
import { SignJWT } from "jose";
import { emailVerificationLink } from '@/Email/emailVerification';

export async function POST(request){
    try {
        await connectDB();
        const payload=await request.json();
        const VelidateSchema=zSchema.pick({
            name:true,
            email:true,
            password:true
        })
        const validatedData=VelidateSchema.safeParse(payload);
        if(!validatedData.success){
            return response(401,false,"Invalid or missing input feild.",validatedData.error)
        }
        const {name,email,password}=validatedData.data;
        const userExist=await userModel.exists({email});
        if(userExist){
            return response(409,false,"User already exist with this email.")
        }
        const newUser=new userModel({name,email,password});
        await newUser.save();
        const secret = new TextEncoder().encode(process.env.SECRET_KEY);  
        const token = await new SignJWT({userId:newUser._id.toString()})
        .setIssuedAt()
        .setExpirationTime('1h')
        .setProtectedHeader({alg:'HS256'})
        .sign(secret);
        await sendMail(email,'Email verificaton request from E-Store ',emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`));
        return response(200,true,"User registered successfully. Please verify your email to activate your account.")
    } catch (error) {
        return Error(error)
    }
}