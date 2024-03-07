import { Next } from "../../../frameworks/types/serverPackageTypes"
import { IDoctorRepository } from "../../interface/repository/doctorRepo"

export const listUnlist = async (doctorRepository:IDoctorRepository, id:string,next:Next)=>{
    try{
        console.log('id from useCase fnctn',id);
        let result= await doctorRepository.list_UnlistDoc(id)
        console.log('result from useCase fnctn',result);
        return result
    }catch(err){

    }
}