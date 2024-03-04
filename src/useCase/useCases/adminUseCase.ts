import { IadminUseCase } from "../interface/useCase/adminUseCase";
import { IadminRepository } from "../interface/repository/adminRepository";
import { IHashPassword } from "../interface/services/hashPassword";
import { IadminJwt,IToken } from "../interface/services/jwt.types";
import { Iadmin } from "../../@types/entity/adminEntity";
import { Next,Req,Res } from "../../frameworks/types/serverPackageTypes";
import { catchError } from "../middleware/catchError";
import { adlogin } from "./admin/login";
import { addTreatment } from "./admin/addTreatment";

import { ITreatmentRepository } from "../interface/repository/treatmentRepository";
import { ITreatment } from "../../@types/entity/treatmentEntity";
import ErrorHandler from "../middleware/errorHandler";


export class AdminUseCase implements IadminUseCase{

    private adminRepository:IadminRepository;
    private bcrypt:IHashPassword;
    private jwtToken:IadminJwt;
    private treatmentRepository:ITreatmentRepository;

    constructor(
        adminRepository:IadminRepository,
        bcrypt:IHashPassword,
        jwtToken:IadminJwt,
        treatmentRepository:ITreatmentRepository
    ){
        this.adminRepository =adminRepository;
        this.bcrypt = bcrypt;
        this.jwtToken = jwtToken;
        this.treatmentRepository =treatmentRepository;

    }

    //admin login
    async adlogin({ email, password }: { email: string; password: string; }, next:Next): Promise< { admin: Iadmin; tokens: IToken; } | void > {
        try{
        return await adlogin(
            this.adminRepository,
            this.bcrypt,
            this.jwtToken,
            email,
            password,
            next    
        )
        }catch(error:unknown){
            catchError(error,next)
        }
    }


    // add treatment
    async addTreatment (req:Req,next:Next):Promise<ITreatment | void> {
        try{
            return await addTreatment (this.treatmentRepository,req,next)
        }catch(err:any){
            catchError(err,next)
        }
    }



}