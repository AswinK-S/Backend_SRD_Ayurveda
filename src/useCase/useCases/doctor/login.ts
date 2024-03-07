import { IDoctor } from "../../../@types/entity/doctorEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IToken } from "../../interface/services/jwt.types";


export const doc_login = async(email:string,password:string,next:Next):Promise<{doctor:IDoctor;token:IToken}|void>=>{
    try{
        console.log('fnctn in usCase--',email,password);
    }catch(err){

    }
}