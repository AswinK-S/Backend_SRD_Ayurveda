import { IadminRepository } from "../../../../useCase/interface/repository/adminRepository";
import { Iadmin } from "../../../../entity/adminEntity";
import adminModel from "../models/adminModel";

import  {
    findAdminByEmail
} from './admin/index'


export class adminRepository implements IadminRepository{

    constructor(private adminModels:typeof adminModel){}

    async findAdminByEmail(email:string):Promise<Iadmin | null> {
        const adminExist = await findAdminByEmail(email,this.adminModels)
        return  adminExist
    }

}