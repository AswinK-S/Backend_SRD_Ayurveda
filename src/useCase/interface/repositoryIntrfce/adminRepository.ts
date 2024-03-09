import { Iadmin } from "../../../@types/entity/adminEntity";
import { Iuser } from "../../../@types/entity/userEntity";
import { Req } from "../../../frameworks/types/serverPackageTypes";

export interface    IadminRepository{
    findAdminByEmail(email:string):Promise<Iadmin | null>
    getUsersAdmnRepo(req:Req):Promise<Iuser[]|null>
}