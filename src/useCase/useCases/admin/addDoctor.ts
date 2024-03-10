import { IDoctor } from "../../../@types/entity/doctorEntity";
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo";
import ErrorHandler from "../../middleware/errorHandler";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IHashPassword } from "../../interface/services/hashPassword";
import { ITreatment } from "../../../@types/entity/treatmentEntity";


export const  addDoctor =async(
    doctorRepository:IDoctorRepository,
    bcrypt:IHashPassword,
    { name, email, mob, password, address, experience, doctor_id, treatment,subTreatment }:
      {name:string,email:string,mob:number,password:string | Promise<string >,address:string,experience:string,doctor_id:string,treatment:string,subTreatment:string} ,
    next:Next
    )=>{
        try{
            console.log('addDoctor function from useCases');
            const isDocExist = await doctorRepository.isDoctorExist(email)
            console.log('isDoc exist :',isDocExist);
            if(isDocExist ==='doctor not exist in this email'){
                const hashedPassword = await bcrypt.createHash(password as string)
                password = hashedPassword
                const result = await doctorRepository.addDoctor({name, email, mob, password, address, experience, doctor_id, treatment,subTreatment})
                
                return{doctor:result,message:'added new doctor'}
            }else{
                // return {doctor:isDocExist,message:'doctor already exists'}
            }
            
        }catch(err:any){
            return next (new ErrorHandler(500,err.message))
        }
    }