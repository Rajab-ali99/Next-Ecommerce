import { connectDB } from "@/lib/connectDB";
import { Error, response } from "@/lib/helperResponse";
import userModel from "@/models/userModel";
import { jwtVerify } from "jose";

export async function POST(request){
   try {
    await connectDB()
    const token=await request.json();
    
    if(!token){
        return response(400,false,"Invalid or missing token.")
    }
    const secret = new TextEncoder().encode(process.env.SECRET_KEY); 
    const decode =await jwtVerify(token.token,secret);
    const userId=decode.payload.userId;
    const user=await userModel.findById(userId);
    if(!user){
        return response(404,false,"User not found with this token.")
    }
    user.isEmailVerified=true;
    await user.save();
    return response(200,true,"Email verified successfully. You can now login to your account.")
   } catch (error) {
      return Error(error)
   }
}