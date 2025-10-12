import mongoose from "mongoose";
const MongoDB_URL = process.env.MONGODB_URI;

let cashed = global.mongoose;
if (!cashed) {
    cashed = global.mongoose = {
        conn: null,
        promise: null
    };
}
export  const connectDB = async () => {
    if (cashed.conn) {
        return cashed.conn;
    }
    if (!cashed.promise) {
        cashed.promise =await mongoose.connect(MongoDB_URL,{
            dbName:"NEXTJS_Ecommerce",
            bufferCommands: false,
        })
        }
    cashed.conn = await cashed.promise;
    return cashed.conn;
}