import { IDoctor } from "../../@types/entity/doctorEntity";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IDoctorUseCase } from "../interface/IntrfcUseCase/doctorUseCase";
import { IDoctorJwt, IToken } from "../interface/services/jwt.types";
import { catchError } from "../middleware/catchError";

import { IDoctorRepository } from "../interface/repositoryIntrfce/doctorRepo";


import {
    doc_login
} from './doctor/index'
import { IHashPassword } from "../interface/services/hashPassword";

export class DoctorUseCase implements IDoctorUseCase{

    private readonly doctorRepository:IDoctorRepository;
    private readonly bcrypt:IHashPassword;
    private readonly jwtToken:IDoctorJwt;
    constructor(
        doctorRepository:IDoctorRepository,
        bcrypt:IHashPassword,
        jwtToken:IDoctorJwt
    ){
        this.doctorRepository =doctorRepository;
        this.bcrypt=bcrypt;
        this.jwtToken=jwtToken
    }

    //login
    async login({email,password}:{email:string; password:string},next:Next):Promise<{doctor:IDoctor;token:IToken}|void>{
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
}