import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import ErrorHandler from "../../middleware/errorHandler"
import { IadminRepository } from "../../interface/repositoryIntrfce/adminRepository";

export const getTreatmentFn = async(req:Req,adminRepository:IadminRepository,next:Next)=>{
    try {
        console.log('req in gttrtmntFn');
        const result = await adminRepository.getTretmentsAdmnRepo(req)
        return result
    } catch (error:any) {
        return next (new ErrorHandler(500,error.message))
    }
}