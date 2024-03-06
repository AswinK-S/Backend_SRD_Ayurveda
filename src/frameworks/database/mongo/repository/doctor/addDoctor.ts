import { IDoctor } from "../../../../../@types/entity/doctorEntity";
import doctorModel from "../../models/doctorModel";

export const addDoctorRepo  = async({name, email, mob, password, address, experience, doctor_id, treatments }: IDoctor):Promise <IDoctor>=>{
    try{    
       console.log('add doc from repo model');
       let newDoctor = await doctorModel.create({name, email, mob, password, address, experience, doctor_id, treatments })
       console.log('addDocRes --->',newDoctor);
       return newDoctor.toObject() as IDoctor
    }catch(err:any){
        console.log('err from addDoctorRepo',err.message);
        throw (err)
    }
}