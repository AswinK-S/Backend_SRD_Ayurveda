import { IadminUseCase } from "../useCase/interface/IntrfcUseCase/adminUseCase";
import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import { accessTokenOptions, refreshTokenOptions } from "../frameworks/middlewares/tokenOptions";
import ErrorHandler from "../useCase/middleware/errorHandler";
import { IDoctor } from "../entity/doctorEntity";


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

                console.log('adminnnnnnn token', result.tokens.accessToken);
                res.status(200).json({ admin: result?.admin, token: result.tokens.accessToken, message: 'admin logged in' })
            }

        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }

    //-----------------------------------------------------------------------------------------------------Treatments    


    //add Treatment
    async add_treatment(req: Req, res: Res, next: Next) {
        try {
            console.log('req from admnCntrlr addTrtmnt', req.body);
            const result = await this.adminUseCase.addTreatment(req.body, next)
            console.log('result of admnCntrlr :', result);
            if (result) {
                res.status(200).json(result)
            }

        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }

    //get Treatments
    async treatments(req: Req, res: Res, next: Next) {
        try {
            console.log('req in cntrlr');
            const result = await this.adminUseCase.getTreatmentUsecase(req, next)
            res.status(200).json(result)

        } catch (err: any) {
            return next(new ErrorHandler(500, err.message))
        }
    }

    // get single Treatment info 
    async treatmentDetail(req: Req, res: Res, next: Next) {
        try {
            console.log('req in cntrlr', req.body);
            const id: string = req.params.id
            console.log('------------', id);
            const result = await this.adminUseCase.findTreatmentUseCase(id, next)
            console.log('rslt in cntrlr', result);
            res.status(200).json(result)
        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }

    // remove single subTreatment 
    async rmvSubTrtmnt(req: Req, res: Res, next: Next) {

        try {
            const id: string = req.body.id
            const subName: string = req.body.subName
            console.log('id ==', id, 'sub==', subName);
            const result = await this.adminUseCase.deleteSubTrtmntUseCase(id,subName)
            console.log('----result in cntrlr-',result);
            res.status(200).json(result)
            
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message))
        }

    }

    //update treatment
    async updateTreatment(req:Req,res:Res,next:Next){
        try {
            console.log('req in cntrlr',req.body);
            const id:string =req.body.id
            const subTreatments:[] =req.body.subTreatments
            console.log('id -->',id,'  subtrt--->',subTreatments);

            const result = await this.adminUseCase.updateTreatmentUseCase(id,subTreatments)
            console.log('rslt in cntrlr',result);
            res.json(result)
        } catch (error:any) {
            return next(new ErrorHandler(500,error.message))
        }
    }

    // change Treatment status
    async treatmentStatus(req: Req, res: Res, next: Next) {
        try {
            console.log('contrlr--', req.body);
            const id: string = req.params.id
            console.log('id--', id);
            const result = await this.adminUseCase.trtmntStsUseCase(id)
            res.status(200).json(result)
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message))
        }
    }



    // ----------------------------------------------------------------------------------------Doctor

    //add Doctor
    async addDoc(req: Req, res: Res, next: Next) {
        try {
            const {
                name,
                email,
                mob,
                password,
                address,
                experience,
                doctor_id,
                treatment,
                subTreatment,
            }: IDoctor = req.body

            console.log('req body', req.body);
            let docResult = await this.adminUseCase.addDoctor({ name, email, mob, password, address, experience, doctor_id, treatment, subTreatment }, next)
            console.log('docResult from controller >', docResult);
            if (docResult) {
                res.status(200).json(docResult)
            }
            else if (docResult === undefined) {
                console.log('doctor exists ');
                res.status(200).json('doctor exists')
            }

        } catch (error: any) {
            return next(new ErrorHandler(500, error.message))
        }
    }


    // list or unlist doctor 
    async docStatus(req: Req, res: Res, next: Next) {
        try {
            let id: string = req.params.id
            console.log('id in cntrlr', id);
            const lstUnlstDocRslt = await this.adminUseCase.listUnlstDoc(id, next)
            console.log('admn cntrlr rslt aftr list/unlst doc', lstUnlstDocRslt);
            res.status(200).json(lstUnlstDocRslt)
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message))
        }
    }

    //verify docotor
    async verifyDoc (req:Req,res:Res,next:Next){
        try {
            const id:string=req.params.id
            console.log('id-->',id);
            const result = await this.adminUseCase.verifyDoctor(id,next)
            console.log('rslt in cntrlr-->',result);
            res.status(200).json(result)
        } catch (error:any) {
            return next (new ErrorHandler(500,error.message))
        }
    }

    //get doctors
    async getDoctors(req: Req, res: Res, next: Next) {
        try {
            console.log('req in contrlr');
            let result = await this.adminUseCase.getDoctorsUseCase(req, next)
            console.log('result in contrlr', result);
            res.status(200).json(result)
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message))
        }
    }

    //------------------------------------------------------------------------------------------------------- user

    // block or unblock user 
    async block(req: Req, res: Res, next: Next) {
        try {
            const id: string = req.params.id
            console.log('iiii--', id);
            const usrBlckRslt = await this.adminUseCase.blockUser(id, next)
            console.log('rslt frm cntrlr usrBlkRslt', usrBlckRslt);
            res.status(200).json(usrBlckRslt)
        } catch (err: any) {
            return next(new ErrorHandler(500, err.message))
        }
    }

    //get users
    async getUsers(req: Req, res: Res, next: Next) {
        try {
            console.log('req----');
            const result = await this.adminUseCase.getUsersUsecase(req, next)
            console.log('req result frm cntrlr', result);
            res.status(200).json(result)

        } catch (err: any) {
            return next(new ErrorHandler(500, err.message))
        }
    }


}