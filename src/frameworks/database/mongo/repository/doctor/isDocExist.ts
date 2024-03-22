import doctorModel from "../../models/doctorModel";
import { IDoctor } from "../../../../../entity/doctorEntity";

export const isDoctorExist = async (email:string):Promise<IDoctor|string> =>{
    try{

        const isDoc = await doctorModel.findOne({email:email})
        let result:IDoctor|string
        console.log('result from doctorModel --',isDoc);
        if(isDoc){
             result =isDoc
        }
        else{
             result ='doctor not exist in this email'
        }
        console.log('result after finding doc',result);
        return result
    }catch(err:any){
        console.log('err frm isDoctorExist >> ',err.message);
        throw (err)
    }
}
