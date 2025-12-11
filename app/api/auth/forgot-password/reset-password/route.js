import { connectDB } from "@/lib/connectDB";
import { Error, response } from "@/lib/helperResponse";
import { zSchema } from "@/lib/zodSchema";
import userModel from "@/models/userModel";


export async function PUT(request){
    try {
        await connectDB();
        const payload=await request.json();
        const VelidateSchema=zSchema.pick({    
            email:true,
            password:true
        })
        const validatedData=VelidateSchema.safeParse(payload);
        if(!validatedData.success){
            return response(401,false,"Invalid or missing input feild.",validatedData.error)
        }
        const {email,password}=validatedData.data;
        const getUser = await userModel.findOne({ deletedAt: null, email }).select('+password');
        getUser.password=password;
        await getUser.save();
        return response(200,true,"Password reset successfully. You can now login with your new password.");
       
    } catch (error) {
        return Error(error)
    }
}