import { IDoctor } from "../../../../@types/entity/doctorEntity";
import { IDoctorRepository } from "../../../../useCase/interface/repositoryIntrfce/doctorRepo";
import doctorModel from "../models/doctorModel";

import {
    addDoctorRepo,
    isDoctorExist,
    lstUnlstDoc,
    findDoctorByEmail
} from './doctor/index'
export class DoctorRepository implements IDoctorRepository{

    constructor(private doctorModels: typeof doctorModel){}

    //add new doctor
    async addDoctor({name, email, mob, password, address, experience, doctor_id, treatment,subTreatment }: IDoctor): Promise<IDoctor> {
        try{
            console.log('addDoctor repository in frmwrk -----');
            return  await addDoctorRepo({name, email, mob, password, address, experience, doctor_id, treatment,subTreatment })
        }catch(err:any){
            console.log('err from clss dctrRepo addDoctr',err.message);
            throw (err)
        }
    }

    // doctor login 
    async findByEmail(email:string):Promise<{doctor:IDoctor}|{message?:string}>{
       try{
        console.log('dctr Rpstry :',email);
        let result = await findDoctorByEmail(email,this.doctorModels)
        let doctor:IDoctor;
        let message:string;
        if(result ===null){
            message='doctor not exist in this mail'
            return {message}
        }else{
           
            return {doctor:result}
        }
       }catch(err){
        throw (err)
       }
    }


    //check if the doctor already exists in the database
    async isDoctorExist(email: string):Promise<IDoctor|string > {
        try{
            return await isDoctorExist(email)
        }catch(err:any){

            console.log('err from clss dctr repo isDoctor');
            throw (err)
        }

    }

    // list or unlist doctor 
    async list_UnlistDoc(id:string):Promise<string>{
        try{
            console.log('id from doctor repo',id);
            let result= await lstUnlstDoc(id)
            console.log('result from repository----',result);
            return result
        }catch(err:any){
            throw(err)
        }
    }
}