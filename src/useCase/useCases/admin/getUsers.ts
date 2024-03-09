import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IadminRepository } from "../../interface/repositoryIntrfce/adminRepository";

export const getUsersFn = async (req:Req,adminRepository:IadminRepository,next:Next)=>{
    try{
        console.log('req ----in fn in uscse',req);
        let result = await adminRepository.getUsersAdmnRepo(req)
        console.log('result from fn in usecae',result);
        return result

    }catch(err:any){
        console.log('err in fn from uscase');
    }

}