import { IDoctor } from "../../../@types/entity/doctorEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IToken } from "../../interface/services/jwt.types";
import { IDoctorRepository } from "../../interface/repository/doctorRepo";
import { IHashPassword } from "../../interface/services/hashPassword";
import ErrorHandler from "../../middleware/errorHandler";

export const doc_login = async(
    doctorRepository:IDoctorRepository,
    bcrypt:IHashPassword,
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
            const isPasswordMatch = await bcrypt.comparePassword(password, hashPassword);
        } else if ('message' in docLogRslt) {
            console.log('Error message:', docLogRslt.message);
            next (new ErrorHandler(400,docLogRslt))
        } 
        

    }catch(err){

    }
}