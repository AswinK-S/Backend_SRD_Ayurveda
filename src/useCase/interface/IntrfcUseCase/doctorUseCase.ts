import { IDoctor } from "../../../entity/doctorEntity";
import { Query } from "../../../entity/query";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IToken } from "../services/jwt.types";

export interface IDoctorUseCase {

    // login
    login({email,password}:{email:string;password:string},next:Next):Promise<{doctor:IDoctor;token:IToken} | void >
    uploadProfileImage(image:any,id:string,next:Next):Promise<any >
    updateProfileUseCase (id:string,query:Query,next:Next):Promise<IDoctor|void>
    
}

