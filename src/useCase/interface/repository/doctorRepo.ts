import { IDoctor } from "../../../@types/entity/doctorEntity";

export interface    IDoctorRepository{
    addDoctor({ name, email, mob, password, address, experience, doctor_id, treatments }: IDoctor):Promise<IDoctor>   
    isDoctorExist(email:string):Promise<IDoctor|string>
    list_UnlistDoc(id:string):Promise<string>
}