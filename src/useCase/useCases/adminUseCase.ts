import { IadminUseCase } from "../interface/IntrfcUseCase/adminUseCase";
import { IadminRepository } from "../interface/repositoryIntrfce/adminRepository";
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
    adlogin,
    block,
    listUnlist,
    getUsersFn,
    getDoctorsFn,
    getTreatmentFn,
    trtmntStsFn
} from './admin/index'

import { ITreatmentRepository } from "../interface/repositoryIntrfce/treatmentRepository";
import { ITreatment } from "../../@types/entity/treatmentEntity";
import { NextFunction } from "express";
import { IDoctor } from "../../@types/entity/doctorEntity";
import { IDoctorRepository } from "../interface/repositoryIntrfce/doctorRepo";

import { IUserRepository } from "../interface/repositoryIntrfce/userRepoIntfc";
import { Iuser } from "../../@types/entity/userEntity";
import { ISendMail } from "../interface/services/sendMail";

export class AdminUseCase implements IadminUseCase {

    private adminRepository: IadminRepository;
    private bcrypt: IHashPassword;
    private jwtToken: IadminJwt;
    private treatmentRepository: ITreatmentRepository;
    private doctorRepository:IDoctorRepository;
    private userRepository:IUserRepository;
    private sendMail:ISendMail;

    constructor(
        adminRepository: IadminRepository,
        bcrypt: IHashPassword,
        jwtToken: IadminJwt,
        treatmentRepository: ITreatmentRepository,
        doctorRepository:IDoctorRepository,
        userRepository:IUserRepository,
        sendMail:ISendMail,
    ) {
        this.adminRepository = adminRepository;
        this.bcrypt = bcrypt;
        this.jwtToken = jwtToken;
        this.treatmentRepository = treatmentRepository;
        this.doctorRepository = doctorRepository;
        this.userRepository= userRepository;
        this.sendMail = sendMail;

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

    //get Treatment
    async getTreatmentUsecase(req:Req,next:Next):Promise<ITreatment[]|void>{
        try {
            console.log('req in useCse');
            const result = await getTreatmentFn(req,this.adminRepository,next)
            if(result)return result
        } catch (error:any) {
            catchError(error,next)
        }
    }

    //treatment status change
    async trtmntStsUseCase (id:string):Promise<ITreatment|void>{
     try{
        return await trtmntStsFn(this.adminRepository,id)
     }catch(err:any){
        throw (err)
     }   
    }

// --------------------------------------------------------------------------------------------------------doctor

   //add doctor
   async addDoctor({ name, email, mob, password, address, experience, doctor_id, treatment,subTreatment }: IDoctor, next: NextFunction): Promise<void | { doctor: IDoctor; message?: string}> {
    try{
        console.log('in the adminUseCase');
        const addDocResult = await addDoctor(this.doctorRepository,this.sendMail,{ name, email, mob, password, address, experience, doctor_id, treatment,subTreatment },next)
        return addDocResult
    }catch(err:any){
        catchError(err,next)
    }    
        
    }

    // list or unlist doctor
    async listUnlstDoc(id:string,next:Next):Promise<string|void>{
        try{
            console.log('id in usecasse ---',id);
            let result =await listUnlist(this.doctorRepository,id,next)
            console.log('result from useCase--->',result);
            return result
        }catch(err:any){
            catchError(err,next)
        }
    }

    //get doctors
    async getDoctorsUseCase(req:Req,next:Next):Promise<IDoctor[]|void>{
        try{
            console.log('req in admnUsecase--');
            let result = await getDoctorsFn(req,this.adminRepository,next)
            if(result)return result
        }catch(err:any){
            catchError(err,next)
        }
    }

// -----------------------------------------------------------------user 

    //block or unblock user
    async blockUser(id:string,next:Next):Promise<string | void>{
        try{
            let result = await block(this.userRepository,id,next)
            return result
        }
        catch(err:any){
            catchError(err,next)
        }
    }

    //get users 
    async getUsersUsecase(req:Req,next:Next):Promise<Iuser[]| void>{
        try{
            console.log('admn useCase-----req:',req);
            let result = await getUsersFn(req,this.adminRepository,next)
            console.log('admn useCase-----req:',result);
            if(result){
            return result
            }
        }catch(error:any){
         catchError(error,next)
        }
    }


}