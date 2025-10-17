
import nodemailer from 'nodemailer';
export async function sendMail(receiver,subject,text){
    const transporter=nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port:process.env.NODEMAILER_PORT,
        secure:false,
        auth:{
            user:process.env.NODEMAILER_Email,
            pass:process.env.NODEMAILER_PASSWORD
        }
    })
    const options={
        from: `'Admin E-Store (Rajab)' <${process.env.NODEMAILER_Email}>`,
        to: receiver,
        subject: subject,
        html:text
    }
    try {
        await transporter.sendMail(options);
        return {success:true,message:"Email sent successfully."}
    } catch (error) {
        return {success:false,message:error.message}
    }
}