import { IDoctor } from "../../../entity/doctorEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IadminRepository } from "../../interface/repositoryIntrfce/adminRepository";
import ErrorHandler from "../../middleware/errorHandler";


export const verifDoctorFn = async (id:string,adminRepository:IadminRepository,next:Next):Promise<IDoctor|void>=>{
    try {
        const result = await adminRepository.verifyDoctorRepo(id)
        return result 
    } catch (error:any) {
        return next (new ErrorHandler(500,error.message))

    }
}