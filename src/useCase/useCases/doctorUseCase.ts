import { IDoctor } from "../../@types/entity/doctorEntity";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IDoctorUseCase } from "../interface/IntrfcUseCase/doctorUseCase";
import { IToken } from "../interface/services/jwt.types";
import { catchError } from "../middleware/catchError";


import {
    doc_login
} from './doctor/index'

export class DoctorUseCase implements IDoctorUseCase{

    constructor(){}

    //login
    async login({email,password}:{email:string; password:string},next:Next):Promise<{doctor:IDoctor;token:IToken}|void>{
        try{
            console.log('useCase--',email, password);
            return await doc_login(email,password,next)
        }catch(err:unknown){
            catchError(err,next)
        }
    }
}