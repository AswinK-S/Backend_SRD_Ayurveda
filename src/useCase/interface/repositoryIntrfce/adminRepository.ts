import { Iadmin } from "../../../entity/adminEntity";
import { IDoctor } from "../../../entity/doctorEntity";
import { Iuser } from "../../../entity/userEntity";
import { Req } from "../../../frameworks/types/serverPackageTypes";
import { ITreatment } from "../../../entity/treatmentEntity";
import { ISubTreatment } from "../../../entity/subTrtmnt";

export interface IadminRepository{
    findAdminByEmail(email:string):Promise<Iadmin | null>
    getUsersAdmnRepo(req:Req):Promise<Iuser[]|null>
    getDoctorsAdmnRepo(req: Req): Promise < IDoctor[] | null > 
    getTretmentsAdmnRepo(req:Req):Promise<ITreatment[]|null>
    getTrtmntStsAdmnRep(id:string):Promise<ITreatment | void>
    findTreatmentAdmnRepo(id:string):Promise<ITreatment|void>
    rmvSubTrtmntAdmnRepo(id:string,subName:string):Promise<ITreatment | void>
    updateTrtmntAdmnRepo(id:string,subTreatments:ISubTreatment[]):Promise<ITreatment | void>
}
