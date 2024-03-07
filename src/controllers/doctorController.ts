import { Req,Res,Next } from "../frameworks/types/serverPackageTypes";
import ErrorHandler from "../useCase/middleware/errorHandler";

import { accessTokenOptions,refreshTokenOptions } from "../frameworks/middlewares/tokenOptions";
import { IDoctorUseCase } from "../useCase/interface/IntrfcUseCase/doctorUseCase";

export class DoctorController {
    private doctorUseCase:IDoctorUseCase
   
    constructor(doctorUseCase:IDoctorUseCase){
        this.doctorUseCase = doctorUseCase
    }

    // login
    async doclogin(req:Req,res:Res,next:Next){
        try{
            console.log('req frm cntrlr',req.body)
            const {email,password}:{email:string,password:string}=req.body
            console.log('email,password',email ,"  ",password);
            const result = await this.doctorUseCase.login({email,password},next)
        }catch(err:any){
            return new ErrorHandler(500,err.message)
        }
    }
}