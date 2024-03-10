import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IadminRepository } from "../../interface/repositoryIntrfce/adminRepository";
import ErrorHandler from "../../middleware/errorHandler";

export const getDoctorsFn =async(req:Req,adminRepository:IadminRepository,next:Next)=>{
    try{
        console.log('req in getDctrsFn');
        let doctors = await adminRepository.getDoctorsAdmnRepo(req)
        return doctors
    }catch(err:any){
        console.log('err in getDoctorFn',err.message);
        return next (new ErrorHandler(500,err.message))
    }
}