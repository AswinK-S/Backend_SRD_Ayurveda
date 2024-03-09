import { Req } from "../../../../types/serverPackageTypes";
import doctorModel from "../../models/doctorModel";

export const getDoctorsRepo = async(req:Req,doctorModels: typeof doctorModel)=>{
    try{
        const result = await doctorModels.find({})
        console.log('found doctors---repo',result);
        return result
    }catch(err:any){
        console.log('err frm dctrs repo',err.message);
        throw (err.message)
    }
}