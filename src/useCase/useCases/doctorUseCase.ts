import { IDoctor } from "../../entity/doctorEntity";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IDoctorUseCase } from "../interface/IntrfcUseCase/doctorUseCase";
import { IDoctorJwt, IToken } from "../interface/services/jwt.types";
import { catchError } from "../middleware/catchError";

import { IDoctorRepository } from "../interface/repositoryIntrfce/doctorRepo";
import ICloudinaryRepository from "../interface/repositoryIntrfce/cloudinaryRepo";


import {
    doc_login,
    updateProPic,
    updateProfileFn,
    updateDocFn,
    getDoctorFn
} from './doctor/index'


import { IHashPassword } from "../interface/services/hashPassword";
import { response } from "express";
import { Query } from "../../entity/query";

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
            const result =await doc_login(
                this.doctorRepository,
                this.bcrypt,
                this.jwtToken,
                email,
                password,
                next)
            return result    
        }catch(err:unknown){
            catchError(err,next)
        }
    }

    //get doctor details
    async getDocDetailUseCase (id:string,next:Next):Promise<IDoctor|void>{
        try {
            const result = await getDoctorFn (id,this.doctorRepository)
            return result
        } catch (error:any) {
            catchError(error,next)
        }
    }

    //upload image
    async uploadProfileImage(image:any,id:string,next:Next):Promise<any|IDoctor >{
        try {
            console.log('---useCase image',image);
            const response = await   this.cloudinary.saveToCloudinary(image,'projectSRd')
            console.log('response in usecase',response);
            if(response){
                const res = await updateProPic(this.doctorRepository,response,id,next)

                return res
            }
        } catch (error:any) {
            console.log('err frm useCase--',error.message);
            catchError(error,next)
        }
    }

    //upload document
    async uploadDoc(image:any,id:string,next:Next):Promise<any|IDoctor>{
        try {
            const result = await this.cloudinary.saveToCloudinary(image,'projectSRd')
            if(result){
                const res =await updateDocFn(this.doctorRepository,result,id,next)
                return res;
            }
        } catch (error:any) {
            catchError(error,next)
        }
    }



    //update doctor profile info
    async updateProfileUseCase (id:string,query:Query,next:Next):Promise<IDoctor|void>{
        try {
          const result =  updateProfileFn(id,query,this.doctorRepository)
          return result
        } catch (error:any) {
            catchError(error,next)
        }
    }
}
