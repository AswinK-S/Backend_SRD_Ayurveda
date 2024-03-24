import { IDoctor } from "../../../entity/doctorEntity";
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo";


export const getDoctorFn = async(id:string,doctorRepository:IDoctorRepository):Promise<IDoctor|void>=>{
    try {
        const result = await doctorRepository.findDoctor(id)
        return result
    } catch (error:any) {
        throw(error)
    }
}