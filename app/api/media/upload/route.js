import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/connectDB";
import { Error, IsAuthorized, response } from "@/lib/helperResponse";
import MediaModel from "@/models/MediaModel";

export async function POST(request) {
    const payload = await request.json()
    try {
        const user = await IsAuthorized('admin')
        if(!user.IsAuth){
            return response(403, false, 'Unauthorized')
        }
        await connectDB();

        const newMedia =await MediaModel.insertMany(payload)
        return response(200, true, 'Media Uploaded Successfully', newMedia)



    } catch (error) {
       if (payload && payload.length > 0){
        const publicIds = payload.map(item => item.public_id);
        try {
            await cloudinary.api.delete_resources(publicIds);
        } catch (CloudinaryError) {
              error.cloudinary = CloudinaryError;
        }
       }
        return Error(error)
    }
}