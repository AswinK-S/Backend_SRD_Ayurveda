import { ITreatment } from "./treatmentEntity";

export interface IDoctor {
    _id?:string,
    name:string,
    email:string,
    mob:number,
    password:string,
    address:string,
    experience:string,
    doctor_id:string,
    treatments:ITreatment[],
    status?:boolean,
    isVerified?:boolean
}