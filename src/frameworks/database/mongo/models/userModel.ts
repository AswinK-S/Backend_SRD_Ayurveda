    import { Iuser } from "../../../../entity/userEntity";

import mongoose,{ Schema,Model } from "mongoose";

const userSchema:Schema<Iuser> =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter valid name'],
        min:3
    },
    email:{
        type:String,
        required:[true,'please enter valid email'],
        unique:true
    },
    mob:{
        type:Number,
        required:[true,'please provide valid number']
    },
    password:{
        type:String,
        required:[true,'password must include 6 characters'],
        min:6
    },
    status:{
        type:Boolean,
        default:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
})

const userModel:Model<Iuser> = mongoose.model('User',userSchema)
export default userModel