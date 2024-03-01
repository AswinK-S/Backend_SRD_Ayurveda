import { Iadmin } from "../../../entity/adminEntity";

export interface IadminRepository{
    findAdminByEmail(email:string):Promise<Iadmin | null>
}