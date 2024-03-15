import { IDoctor } from "../../@types/entity/doctorEntity";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IDoctorUseCase } from "../interface/IntrfcUseCase/doctorUseCase";
import { IDoctorJwt, IToken } from "../interface/services/jwt.types";
import { catchError } from "../middleware/catchError";

import { IDoctorRepository } from "../interface/repositoryIntrfce/doctorRepo";
import ICloudinaryRepository from "../interface/repositoryIntrfce/cloudinaryRepo";


import {
    doc_login
} from './doctor/index'
import { IHashPassword } from "../interface/services/hashPassword";

export class DoctorUseCase implements IDoctorUseCase{

    private readonly doctorRepository:IDoctorRepository;
    private readonly bcrypt:IHashPassword;
    private readonly jwtToken:IDoctorJwt;
    private readonly cloudinary:ICloudinaryRepository;
    constructor(
        doctorRepository:IDoctorRepository,
        bcrypt:IHashPassword,
        jwtToken:IDoctorJwt,
        cloudinay:ICloudinaryRepository
    ){
        this.doctorRepository =doctorRepository;
        this.bcrypt=bcrypt;
        this.jwtToken=jwtToken
        this.cloudinary=cloudinay
    }

    //login
    async login({email,password,mob}:{email:string; password:string,mob:number},next:Next):Promise<{doctor:IDoctor;token:IToken}|void>{
        try{
            console.log('useCase--',email, password);
            return await doc_login(
                this.doctorRepository,
                this.bcrypt,
                this.jwtToken,
                email,
                password,
                next)
        }catch(err:unknown){
            catchError(err,next)
        }
    }

    async uploadProfileImage(image:any,next:Next):Promise<any >{
        try {
            console.log('---useCase image',image);
            const response = await   this.cloudinary.saveToCloudinary(image)
            console.log('response in usecase',response);
        } catch (error) {
            catchError(error,next)
        }
    }
}