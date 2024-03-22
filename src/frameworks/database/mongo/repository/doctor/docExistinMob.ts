import doctorModel from "../../models/doctorModel";
import { IDoctor } from "../../../../../entity/doctorEntity";

export const isDocExistInMob = async (mob:number):Promise<IDoctor|string> =>{
    try{

        const isDoc = await doctorModel.findOne({mob:mob})
        let result:IDoctor|string
        console.log('result from doctorModel --',isDoc);
        if(isDoc){
             result =isDoc
        }
        else{
             result ='doctor not exist in this mobile'
        }
        console.log('result after finding doc',result);
        return result
    }catch(err:any){
        console.log('err frm isDoctorExist >> ',err.message);
        throw (err)
    }
}
