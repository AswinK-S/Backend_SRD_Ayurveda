import { IDoctor } from "../../../entity/doctorEntity";
import { Query } from "../../../entity/query";
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo";


export const updateProfileFn = async(id:string,query:Query,doctorRepository:IDoctorRepository):Promise<IDoctor|void>=>{
    try {
        const result = await doctorRepository.updateDetailsRepo(id,query)
        return result
    } catch (error:any) {
        throw (error)
    }
}