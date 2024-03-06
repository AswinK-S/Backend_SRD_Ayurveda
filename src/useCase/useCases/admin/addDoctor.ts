import { IDoctor } from "../../../@types/entity/doctorEntity";
import { IDoctorRepository } from "../../interface/repository/doctorRepo";
import ErrorHandler from "../../middleware/errorHandler";
import { Next } from "../../../frameworks/types/serverPackageTypes";

export const addDoctor =async(
    doctorRepository:IDoctorRepository,
    { name, email, mob, password, address, experience, doctor_id, treatments }: IDoctor ,
    next:Next
    )=>{
        try{
            console.log('addDoctor function from useCases');
            const isDocExist = await doctorRepository.isDoctorExist(email)
            console.log('isDoc exist :',isDocExist);
            if(isDocExist ==='doctor not exist in this email'){
                const result = await doctorRepository.addDoctor({name, email, mob, password, address, experience, doctor_id, treatments})
                return{doctor:result,message:'added new doctor'}
            }else{
                // return {doctor:isDocExist,message:'doctor already exists'}
            }
            
        }catch(err:any){
            return next (new ErrorHandler(500,err.message))
        }
    }