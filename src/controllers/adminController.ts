import { IadminUseCase } from "../useCase/interface/IntrfcUseCase/adminUseCase";
import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import { accessTokenOptions, refreshTokenOptions } from "./middlewares/tokenOptions";
import ErrorHandler from "../useCase/middleware/errorHandler";
import { IDoctor } from "../@types/entity/doctorEntity";


export class AdminController {
    private adminUseCase: IadminUseCase;

    constructor(adminUseCase: IadminUseCase) {
        this.adminUseCase = adminUseCase
    }

    // admin login
    async adlogin(req: Req, res: Res, next: Next) {
        try {
            let result = await this.adminUseCase.adlogin(req.body, next)
            console.log('result from admnCntrlr adlogin :', result);
            if (result) {
                res.cookie('accessToken', result?.tokens.accessToken, accessTokenOptions)
                res.cookie('refreshToken', result?.tokens.accessToken, refreshTokenOptions)

                console.log('adminnnnnnn token',result.tokens.accessToken);
                res.status(200).json({ admin: result?.admin,token:result.tokens.accessToken, message: 'admin logged in' })
            }

        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }


    //add Treatment
    async add_treatment(req:Req,res:Res,next:Next){
        try{
            console.log('req from admnCntrlr addTrtmnt',req.body);
            let result = await this.adminUseCase.addTreatment(req.body,next)
            console.log('result of admnCntrlr :',result);
            if(result){
                res.status(200).json(result)
            }

        }catch(error:any){
            return next (new ErrorHandler(500,error.message))
        }
    }


    //add Doctor
    async addDoc(req:Req,res:Res,next:Next){
        try{
            const{
                name,
                email,
                mob,
                password,
                address,
                experience,
                doctor_id,
                treatments
            }:IDoctor=req.body

            console.log('req body',req.body);
            let docResult = await this.adminUseCase.addDoctor({name,email,mob,password,address,experience,doctor_id,treatments},next)

        }catch(error:any){
            return next(new ErrorHandler(500,error.message))
        }
    }

    
}