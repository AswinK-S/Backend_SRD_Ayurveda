import { IDoctor } from "../../@types/entity/doctorEntity";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IDoctorUseCase } from "../interface/IntrfcUseCase/doctorUseCase";
import { IToken } from "../interface/services/jwt.types";
import { catchError } from "../middleware/catchError";

import { IDoctorRepository } from "../interface/repository/doctorRepo";


import {
    doc_login
} from './doctor/index'
import { IHashPassword } from "../interface/services/hashPassword";

export class DoctorUseCase implements IDoctorUseCase{

    private readonly doctorRepository:IDoctorRepository;
    private readonly bcrypt:IHashPassword
    constructor(
        doctorRepository:IDoctorRepository,
        bcrypt:IHashPassword,
    ){
        this.doctorRepository =doctorRepository;
        this.bcrypt=bcrypt;
    }

    //login
    async login({email,password}:{email:string; password:string},next:Next):Promise<{doctor:IDoctor;token:IToken}|void>{
        try{
            console.log('useCase--',email, password);
            return await doc_login(
                this.doctorRepository,
                this.bcrypt,
                email,
                password,
                next)
        }catch(err:unknown){
            catchError(err,next)
        }
    }
}