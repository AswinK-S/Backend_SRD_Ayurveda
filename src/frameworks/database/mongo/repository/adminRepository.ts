import { IadminRepository } from "../../../../useCase/interface/repositoryIntrfce/adminRepository";
import { Iadmin } from "../../../../@types/entity/adminEntity";
import adminModel from "../models/adminModel";

import  {
    findAdminByEmail,
    getUsersRepo
} from './admin/index'
import { Req } from "../../../types/serverPackageTypes";
import { Iuser } from "../../../../@types/entity/userEntity";
import userModel from "../models/userModel";


export class AdminRepository implements IadminRepository{

    constructor(
        private adminModels:typeof adminModel,
        private userModels:typeof userModel,
        ){}

    async findAdminByEmail(email:string):Promise<Iadmin | null> {
        const adminExist = await findAdminByEmail(email,this.adminModels)
        return  adminExist
    }

    async getUsersAdmnRepo (req:Req):Promise<Iuser[]|null>{
        let users = await getUsersRepo(req,this.userModels)
        return users
    }

}