import { IadminUseCase } from "../useCase/interface/useCase/adminUseCase";
import { Req,Res,Next } from "../frameworks/types/serverPackageTypes";

import { accessTokenOptions,refreshTokenOptions } from "./middlewares/tokenOptions";
import ErrorHandler from "../useCase/middleware/errorHandler";


export class AdminController {
    private adminUseCase:IadminUseCase;

    constructor(adminUseCase:IadminUseCase){
        this.adminUseCase = adminUseCase
    }

    // admin login
    async adlogin(req:Req,res:Res,next:Next){
        try{
            let result = await this.adminUseCase.adlogin(req.body,next)
            console.log('result from admnCntrlr adlogin :',result);

          res.cookie('accessToken',result?.tokens.accessToken,accessTokenOptions)
          res.cookie('refreshToken',result?.tokens.accessToken,refreshTokenOptions)

          res.status(200).json({})
        }catch(error:any){
            return next (new ErrorHandler(500,error.message))
        }
    }
}