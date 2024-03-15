import { IDoctor } from "../../../@types/entity/doctorEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IDoctorJwt, IToken } from "../../interface/services/jwt.types";
import { IDoctorRepository } from "../../interface/repositoryIntrfce/doctorRepo";
import { IHashPassword } from "../../interface/services/hashPassword";
import ErrorHandler from "../../middleware/errorHandler";

export const doc_login = async(
    doctorRepository:IDoctorRepository,
    bcrypt:IHashPassword,
    tokens:IDoctorJwt,
    email:string,
    password:string,
    next:Next
    ):Promise<{doctor:IDoctor;token:IToken}|void>=>{
    try{
        console.log('fnctn in usCase--',email,password);
        let docLogRslt = await doctorRepository.findByEmail(email)
        console.log('reslt frm doc_login',docLogRslt);
       

        if ('doctor' in docLogRslt) {
            console.log('---------', docLogRslt.doctor.password);
            const hashPassword = docLogRslt.doctor.password
            console.log('entered psswrd--',password);

            const bcryptRegex = /^\$2[aby]\$.{56}$/;
            let isPasswordMatch:boolean= false

            if(bcryptRegex.test(hashPassword)){
                isPasswordMatch = await bcrypt.comparePassword(password, hashPassword);
                console.log('psswrd mtch---',isPasswordMatch);
            }else{
                isPasswordMatch = (hashPassword===password)?true:false
                console.log('pswrdMtch psswrd not hshed case ---',isPasswordMatch);
                isPasswordMatch
            }
            
           

            if(!isPasswordMatch){
                 next(new ErrorHandler(400, 'invalid password'))
            }else if( docLogRslt.doctor.status!==true){
                console.log('status false');
                  next(new ErrorHandler(403,'doctor is not listed'))
            }else{
                docLogRslt.doctor.password= ''
                const doctor: IDoctor = docLogRslt.doctor;
                console.log('login succs');
                const role='doctor'
                const token = await tokens.createAccessAndRefreshToken(docLogRslt.doctor?._id as string,role as string)
                
                return {
                    doctor,
                    token,
                }
            }

        } else if ('message' in docLogRslt) {
            console.log('Error message:', docLogRslt.message);
            next (new ErrorHandler(400,docLogRslt))
        } 
        

    }catch(err){

    }
}