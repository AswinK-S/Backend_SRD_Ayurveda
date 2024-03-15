import { IDoctor } from "../../../@types/entity/doctorEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IToken } from "../services/jwt.types";

export interface IDoctorUseCase {

    // login
    login({email,password}:{email:string;password:string},next:Next):Promise<{doctor:IDoctor;token:IToken} | void >
    uploadProfileImage(image:any,id:string,next:Next):Promise<any >
    
}

