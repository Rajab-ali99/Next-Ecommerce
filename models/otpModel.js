import mongoose from "mongoose";
import { de } from "zod/v4/locales";
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    expiresAt:{
        type:Date,
        required:true,
        default:()=> new Date(Date.now() + 10*60*1000) // 10 minutes from now
    }
},{timestamps:true});
otpSchema.index({expiresAt:1},{expireAfterSeconds:0});

const otpModel=mongoose.models.otp || mongoose.model('otp',otpSchema,'otps');
export default otpModel;
