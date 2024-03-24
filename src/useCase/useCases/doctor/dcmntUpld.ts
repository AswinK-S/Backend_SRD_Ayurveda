import { IDoctor } from "../../../entity/doctorEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo";


export const updateDocFn = async(doctorRepository:IDoctorRepository,img:string,id:string,next:Next):Promise<IDoctor|void>=>{
    try {
        console.log('updateDocFN-----');
        const result = await doctorRepository.updateDoc(img,id)
        if(result){
            result.password=''
            return result
        }
    } catch (error:any) {
        throw (error)
    }
}