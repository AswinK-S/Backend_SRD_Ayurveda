import { IDoctor } from "../../../../@types/entity/doctorEntity";
import mongoose, { Model, Schema } from "mongoose";

const doctorSchema: Schema<IDoctor> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mob: { type: Number, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    experience: { type: String, required: true },
    doctor_id: { type: String, required: true },
    treatments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Treatment' }], // Reference to Treatment model
    status: { type: Boolean },
    isVerified: { type: Boolean },
})

const doctorModel:Model<IDoctor> = mongoose.model('Doctor',doctorSchema)
export default doctorModel