import { IadminUseCase } from "../interface/IntrfcUseCase/adminUseCase";
import { IadminRepository } from "../interface/repository/adminRepository";
import { IHashPassword } from "../interface/services/hashPassword";
import { IadminJwt, IToken } from "../interface/services/jwt.types";
import { Iadmin } from "../../@types/entity/adminEntity";
import { Next, Req, Res } from "../../frameworks/types/serverPackageTypes";
import { catchError } from "../middleware/catchError";


// import { adlogin } from "./admin/login";
// import { addTreatment } from "./admin/addTreatment";

import {
    addDoctor,
    addTreatment,
    adlogin
} from './admin/index'

import { ITreatmentRepository } from "../interface/repository/treatmentRepository";
import { ITreatment } from "../../@types/entity/treatmentEntity";
import ErrorHandler from "../middleware/errorHandler";
import { NextFunction } from "express";
import { IDoctor } from "../../@types/entity/doctorEntity";
import { IDoctorRepository } from "../interface/repository/doctorRepo";


export class AdminUseCase implements IadminUseCase {

    private adminRepository: IadminRepository;
    private bcrypt: IHashPassword;
    private jwtToken: IadminJwt;
    private treatmentRepository: ITreatmentRepository;
    private doctorRepository:IDoctorRepository;

    constructor(
        adminRepository: IadminRepository,
        bcrypt: IHashPassword,
        jwtToken: IadminJwt,
        treatmentRepository: ITreatmentRepository,
        doctorRepository:IDoctorRepository
    ) {
        this.adminRepository = adminRepository;
        this.bcrypt = bcrypt;
        this.jwtToken = jwtToken;
        this.treatmentRepository = treatmentRepository;
        this.doctorRepository = doctorRepository

    }

    //admin login
    async adlogin({ email, password }: { email: string; password: string; }, next: Next): Promise<{ admin: Iadmin; tokens: IToken; } | void> {
        try {
            return await adlogin(
                this.adminRepository,
                this.bcrypt,
                this.jwtToken,
                email,
                password,
                next
            )
        } catch (error: unknown) {
            catchError(error, next)
        }
    }


    // add treatment
    async addTreatment(req: Req, next: Next): Promise<{ treatment: ITreatment; message?: string; } | void> {
        try {
            // Call the actual addTreatment function and store the result
            console.log('req from addTreatment adminUseCase ',req);
            const result = await addTreatment(this.treatmentRepository, req, next);
            console.log('result from adminuseCase addTrtmnt :',result);
            return result
          
        } catch (err: any) {
            catchError(err, next);
        }
    }

   //add doctor
   async addDoctor({ name, email, mob, password, address, experience, doctor_id, treatments }: IDoctor, next: NextFunction): Promise<void | { doctor: IDoctor; message?: string}> {
    try{
        console.log('in the adminUseCase');
        const addDocResult = await addDoctor(this.doctorRepository,{ name, email, mob, password, address, experience, doctor_id, treatments },next)
        return addDocResult
    }catch(err:any){
        catchError(err,next)
    }    
        
    }



}