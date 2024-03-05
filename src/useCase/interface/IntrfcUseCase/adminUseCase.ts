import { Iadmin } from "../../../@types/entity/adminEntity";
import { Next ,Req} from "../../../frameworks/types/serverPackageTypes";
import { IToken } from "../services/jwt.types";
import { ITreatment } from "../../../@types/entity/treatmentEntity";

export interface IadminUseCase {

    // adminLogin
    adlogin({email,password}:{email:string,password:string},next:Next):Promise<{admin:Iadmin;tokens:IToken} | void>

    //add treatment
    addTreatment(req:Req,next:Next):Promise<{treatment:ITreatment; message?: string;} | void>
    

}