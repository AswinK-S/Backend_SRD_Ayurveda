import { IDoctor } from "../../../@types/entity/doctorEntity";
import { ITreatment } from "../../../@types/entity/treatmentEntity";

export interface    IDoctorRepository{
    addDoctor({ name, email, mob, password, address, experience, doctor_id, treatment,subTreatment }:
      {name:string,email:string,mob:number,password:string | Promise<string >,address:string,experience:string,doctor_id:string,treatment:string,subTreatment:string}):Promise<IDoctor>   
    isDoctorExist(email:string):Promise<IDoctor|string>
    isDocExistInMob(mob:number):Promise<IDoctor|string>
    list_UnlistDoc(id:string):Promise<string>
    findByEmail(email:string):Promise<{doctor:IDoctor}|{message?:string}>
}