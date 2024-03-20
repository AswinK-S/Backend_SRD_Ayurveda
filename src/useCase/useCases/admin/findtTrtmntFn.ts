import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IadminRepository } from "../../interface/repositoryIntrfce/adminRepository";
import ErrorHandler from "../../middleware/errorHandler";


export const findTreatmentFn = async(id:string,adminRepository:IadminRepository,next:Next)=>{
    try {
        console.log('fnd trtmnt fn');
        const result = await adminRepository.findTreatmentAdmnRepo(id)
        return result
    } catch (error:any) {
        next (new ErrorHandler(500,error.message))
    }
}