import { IDoctor } from "../../../../../entity/doctorEntity";
import doctorModel from "../../models/doctorModel";

export const addDoctorRepo  = async({name, email, mob, password, address, experience, doctor_id, treatment,subTreatment }: IDoctor):Promise <IDoctor>=>{
    try{    
       console.log('add doc from repo model');
       const doc={name, email, mob, password, address, experience, doctor_id, treatment,subTreatment }
       console.log('doc data to enter',doc);
       let newDoctor = await doctorModel.create({name, email, mob, password, address, experience, doctor_id, treatment,subTreatment })
       console.log('addDocRes --->',newDoctor);
       return newDoctor.toObject() as IDoctor
    }catch(err:any){
        console.log('err from addDoctorRepo------',err.message);
        throw (err)
    }
}