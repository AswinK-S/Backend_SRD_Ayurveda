import { IDoctor } from "../../../entity/doctorEntity";
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo";


export const getDoctorFn = async(id:string,doctorRepository:IDoctorRepository):Promise<IDoctor|void>=>{
    try {
        const result = await doctorRepository.findDoctor(id)
        if (result)  result.password =''
        return result
    } catch (error:any) {
        throw(error)
    }
}