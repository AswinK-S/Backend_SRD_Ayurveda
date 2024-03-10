import { Iadmin } from "../../../@types/entity/adminEntity";
import { IDoctor } from "../../../@types/entity/doctorEntity";
import { Iuser } from "../../../@types/entity/userEntity";
import { Req } from "../../../frameworks/types/serverPackageTypes";
import { ITreatment } from "../../../@types/entity/treatmentEntity";

export interface IadminRepository{
    findAdminByEmail(email:string):Promise<Iadmin | null>
    getUsersAdmnRepo(req:Req):Promise<Iuser[]|null>
    getDoctorsAdmnRepo(req: Req): Promise < IDoctor[] | null > 
    getTretmentsAdmnRepo(req:Req):Promise<ITreatment[]|null>
}
