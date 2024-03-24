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
    treatment:string,
    subTreatment:string,
    status?:boolean,
    isVerified?:boolean,
    image?:string,
    document?:{type:String}

}