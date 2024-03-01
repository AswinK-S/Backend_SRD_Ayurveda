import { Iadmin } from "../../../entity/adminEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IToken } from "../services/jwt.types";

export interface IadminUseCase {

    // adminLogin
    adlogin({email,password}:{email:string,password:string},next:Next):Promise<{admin:Iadmin;tokens:IToken} | void>

}