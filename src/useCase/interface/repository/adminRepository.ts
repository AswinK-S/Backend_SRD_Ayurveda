import { Iadmin } from "../../../@types/entity/adminEntity";

export interface IadminRepository{
    findAdminByEmail(email:string):Promise<Iadmin | null>
}