import { Iadmin } from "../../../../entity/adminEntity";
import mongoose,{ Schema,Model } from "mongoose";

const adminSchema:Schema<Iadmin> = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password :{
        type: String,
        required: true
    }    
})

const adminModel:Model<Iadmin> = mongoose.model('Admin',adminSchema)
export default  adminModel