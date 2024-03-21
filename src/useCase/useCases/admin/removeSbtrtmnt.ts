import { IadminRepository } from "../../interface/repositoryIntrfce/adminRepository";

export const    rmvSubTrtmntFn = async(id:string,subName:string,adminRepository:IadminRepository)=>{
    try {
        const result = await adminRepository.rmvSubTrtmntAdmnRepo(id,subName)
        return result
    } catch (error:any) {
        throw (error)
    }
}