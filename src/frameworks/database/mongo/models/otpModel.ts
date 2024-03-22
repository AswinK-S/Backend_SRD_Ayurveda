import { IOtp } from "../../../../entity/otp";

import mongoose, { Schema } from "mongoose";

const OtpSchema:Schema<IOtp> = new mongoose.Schema({
    email:String,
    otp:{
        required:true,
        type:String
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
    },
    expiresAt:{
        type:Date,
        default:Date.now,
        expires:10*60,
        required:true
    }

})

const  OTP= mongoose.model<IOtp>('OTP',OtpSchema)

OtpSchema.post<IOtp>('save',function(doc){
    setTimeout(async ()=>{
        try{
            const deleteOtp = await OTP.findByIdAndDelete(doc._id)
            if(!deleteOtp){
                console.log('document not found')
            }else{
                console.log(`document deleted ${deleteOtp}`);
            }
        }catch(error){
            console.log(`Error in deleting :${error}`)
        }
    },10*60*1000)
})


export default OTP