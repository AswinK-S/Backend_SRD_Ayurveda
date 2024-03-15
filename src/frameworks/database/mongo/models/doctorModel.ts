import { IDoctor } from "../../../../@types/entity/doctorEntity";
import mongoose, { Model, Schema } from "mongoose";

const doctorSchema: Schema<IDoctor> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique: true },
    mob: { type: Number, required: true,unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    experience: { type: String, required: true },
    doctor_id: { type: String, required: true },
    treatment:{type:String,required:true},
    subTreatment:{type:String,required:true},
    status: { type: Boolean ,default:true},
    isVerified: { type: Boolean,default:false },
    image:{type:String},
})

const doctorModel:Model<IDoctor> = mongoose.model('Doctor',doctorSchema)
export default doctorModel


