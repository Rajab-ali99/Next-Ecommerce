import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const { NextResponse } = require("next/server")

export async function response(statusCode, success, message, data = {}) {
    return NextResponse.json({ statusCode, success, message, data })
}

export async function Error(error, customMessage) {
    // Duplicate keys Error
    if (error.code === 11000) {
        const keys = Object.keys(error.keyPattern).join(", ");
        error.message = `Duplicate Keys : ${keys}. These feilds must be unique.`
    }

      let errorOBJ = {}
    if (process.env.NODE_ENV === "development") {
        errorOBJ = {
            message: error.message,
            error
        }
    }else{
        errorOBJ = {
            message: customMessage || 'Internal Server Error'
        }
    }
    return NextResponse.json({ statusCode: error.code, success: false, ...errorOBJ })
}


export async function otpGenerate(){
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
}

export async function IsAuthorized(role){
    try {
        const cookieStore = await cookies();
        if(!cookieStore.has('access_Token')){
            return{
                IsAuth: false
            }
        }

        const token = cookieStore.get('access_Token');
        const {payload} = await jwtVerify(token?.value, new TextEncoder().encode(process.env.SECRET_KEY))
        if(payload.role !== role){
             return{
                IsAuth: false
            }
        }

         return{
                IsAuth: true,
                userId : payload._id
            }
        
    } catch (error) {
        return{
                IsAuth: false,
                error
            }
    }
}