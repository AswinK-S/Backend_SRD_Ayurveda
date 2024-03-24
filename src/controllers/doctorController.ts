import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import ErrorHandler from "../useCase/middleware/errorHandler";

import { accessTokenOptions, refreshTokenOptions } from "../frameworks/middlewares/tokenOptions";
import { IDoctorUseCase } from "../useCase/interface/IntrfcUseCase/doctorUseCase";
import { Query } from "../entity/query";
export class DoctorController {
    private doctorUseCase: IDoctorUseCase

    constructor(doctorUseCase: IDoctorUseCase) {
        this.doctorUseCase = doctorUseCase
    }

    // login
    async doclogin(req: Req, res: Res, next: Next) {
        try {
            console.log('req frm cntrlr', req.body)
            const { email, password }: { email: string, password: string } = req.body
            console.log('email,password', email, "  ", password);
            const result = await this.doctorUseCase.login({ email, password }, next)
            if (result) {
                console.log('res frm cntrlr', result);
                res.status(201).json({ doctor: result.doctor, token: result.token.accessToken, message: 'doctor logged in' })
            }
        } catch (err: any) {
            return new ErrorHandler(500, err.message)
        }
    }

    //get doctor details
    async getDoctor(req:Req,res:Res,next:Next){
        try {
            const id:string= req.params.id
            const result = await this.doctorUseCase.getDocDetailUseCase(id,next)
            console.log('rslt in cntrlr--------->',result);
            res.status(200).json(result)
        } catch (error:any) {
            return new ErrorHandler(500,error.message)
        }
    }
 

    // post doctor details 
    async doctorDetails(req: Req, res: Res, next: Next) {
        try {
            console.log('req in cntrlr', req.body);
            const { id, name, mob, address }: { id: string, name: string, mob: string, address: string } = req.body
            console.log('id :', id, 'name :', name, 'mob :', mob, 'add :', address);
            
            const query: Query = {};
            
            if (name) {
                query.name = name;
            }
            if (mob) {
                query.mob = mob;
            }
            if (address) {
                query.address = address;
            }

            const result = await this.doctorUseCase.updateProfileUseCase(id,query,next)
            console.log('rslt in cntrlr',result);

        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }


       //update profile image
       async profileImg(req: Req, res: Res, next: Next) {
        try {
            console.log('req--', req.file);
            const image: any = req.file
            const id: string = req.body.id
            console.log('req body', req.body, " id >", id);
            const result = await this.doctorUseCase.uploadProfileImage(image, id, next)
            console.log('reslt in cntrlr', result);
            res.status(200).json(result)
        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }

    // upload document 
    async uploadDoc(req:Req,res:Res,next:Next){
        try{
            console.log('re in cntrlr',req.file);
            const image:any = req.file
            const id: string = req.body.id
            console.log('id-->',id,'image--->',image);
            const result = await this.doctorUseCase.uploadDoc(image,id,next)
            console.log('rslt in cntrlr',result);

        }catch(error:any){
            return next( new ErrorHandler(500,error.message))
        }
    }


    


}