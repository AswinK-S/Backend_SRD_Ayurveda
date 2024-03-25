import { Iadmin } from "../../../entity/adminEntity";
import { Iuser } from "../../../entity/userEntity";
import { Next ,Req} from "../../../frameworks/types/serverPackageTypes";
import { IToken } from "../services/jwt.types";
import { ITreatment } from "../../../entity/treatmentEntity";
import { IDoctor } from "../../../entity/doctorEntity";
import { ISubTreatment } from "../../../entity/subTrtmnt";
export interface IadminUseCase {

    // adminLogin
    adlogin({email,password}:{email:string,password:string},next:Next):Promise<{admin:Iadmin;tokens:IToken} | void>

//--------------------------------------------------------------------------------------------------------------Treatment

    //add treatment
    addTreatment(req:Req,next:Next):Promise<{treatment:ITreatment; message?: string;} | void>
    //get treatments
    getTreatmentUsecase(req:Req,next:Next):Promise<ITreatment[]|void>
    //change treatment status
    trtmntStsUseCase(id:string):Promise<ITreatment|void>
    //get single treatment info
    findTreatmentUseCase(id:string,next:Next):Promise<ITreatment|void>
    //remove subTreatment
    deleteSubTrtmntUseCase(id:string,subName:string):Promise<ITreatment|void>
    //update Treatment
    updateTreatmentUseCase(id:string,subTreatments:ISubTreatment[]):Promise<{treatment:ITreatment|null,message:string}>

//-----------------------------------------------------------------------------------Doctors

    //add Doctor
    addDoctor({name,email,mob,password,address,experience,doctor_id,treatment,subTreatment}:IDoctor,next:Next):Promise <{doctor:IDoctor;message?:string;}| void>
    //getDoctor
    getDoctorsUseCase(req:Req,next:Next):Promise<IDoctor[]|void>    
    //list or unlist user
    listUnlstDoc(id:string,next:Next):Promise<string|void>
    //verifyDoctor
    verifyDoctor (id:string,next:Next):Promise<IDoctor|void>

//--------------------------------------------------------------------------------------users    

    // block or unblock user
    blockUser(id:string,next:Next):Promise<string|void>
    //get users
    getUsersUsecase(req:Req,next:Next):Promise<Iuser[]|void>


}