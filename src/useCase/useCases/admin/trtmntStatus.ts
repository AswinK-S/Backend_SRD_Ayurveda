import { IadminRepository } from "../../interface/repositoryIntrfce/adminRepository";

export const trtmntStsFn = async(adminRepository:IadminRepository,id:string)=>{
    try {
        return await adminRepository.getTrtmntStsAdmnRep(id)
    } catch (error:any) {
        throw (error)
    }
}