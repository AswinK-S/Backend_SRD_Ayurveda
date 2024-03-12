import { IDoctor } from "../../../@types/entity/doctorEntity";
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo";
import ErrorHandler from "../../middleware/errorHandler";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IHashPassword } from "../../interface/services/hashPassword";
import { ITreatment } from "../../../@types/entity/treatmentEntity";
import { ISendMail } from "../../interface/services/sendMail";


export const  addDoctor =async(
    doctorRepository:IDoctorRepository,
    sendMail:ISendMail,
    { name, email, mob, password, address, experience, doctor_id, treatment,subTreatment }:
      {name:string,email:string,mob:number,password:string | Promise<string >,address:string,experience:string,doctor_id:string,treatment:string,subTreatment:string} ,
    next:Next
    )=>{
        try{
            console.log('addDoctor function from useCases');
            const isDocExistInEmail = await doctorRepository.isDoctorExist(email)

            console.log('isDoc exist in mail:',isDocExistInEmail);
            if(isDocExistInEmail ==='doctor not exist in this email'){
                console.log('doctor not exist in this email');
                const isDoctorExistInMob = await doctorRepository.isDocExistInMob(mob)
                console.log('is doc exisst in mob--',isDoctorExistInMob);
                if(isDoctorExistInMob ==='doctor not exist in this mobile'){
                    console.log('doctor not exist in this mobile');
                    const result = await doctorRepository.addDoctor({name, email, mob, password, address, experience, doctor_id, treatment,subTreatment})
                    
                    //send email to doctor
                    const emailRes = await sendMail.sendMailToDoc(email,password as string)
                    console.log('email send result',emailRes);
                    if(emailRes.success){
                        return{doctor:result,message:'mail send to doctor ,added new doctor'}
                    }    

                }else{
                    // return{doctor:isDoctorExistInMob,message:'doctor exist in this mobile'}
   
                }

                // const hashedPassword = await bcrypt.createHash(password as string)
                // password = hashedPassword
                
            }else{
                // return {doctor:isDocExistInEmail,message:'doctor exists in this mail'}
            }
            
        }catch(err:any){
            return next (new ErrorHandler(500,err.message))
        }
    }