import { IadminRepository } from "../../../../useCase/interface/repositoryIntrfce/adminRepository";
import { Iadmin } from "../../../../@types/entity/adminEntity";
import adminModel from "../models/adminModel";

import {
    findAdminByEmail,
    getUsersRepo,
    getDoctorsRepo,
} from './admin/index'
import { Req } from "../../../types/serverPackageTypes";
import { Iuser } from "../../../../@types/entity/userEntity";
import userModel from "../models/userModel";
import doctorModel from "../models/doctorModel";
import { IDoctor } from "../../../../@types/entity/doctorEntity";


export class AdminRepository implements IadminRepository {

    constructor(
        private adminModels: typeof adminModel,
        private userModels: typeof userModel,
        private doctorModels: typeof doctorModel,
    ) { }

    async findAdminByEmail(email: string): Promise<Iadmin | null> {
        try {
            const adminExist = await findAdminByEmail(email, this.adminModels)
            return adminExist
        } catch (err: any) {
            throw (err)
        }
    }

    async getUsersAdmnRepo(req: Req): Promise<Iuser[] | null> {
        try {
            let users = await getUsersRepo(req, this.userModels)
            return users
        } catch (err: any) {
            throw (err)
        }
    }


    async getDoctorsAdmnRepo(req: Req): Promise < IDoctor[] |null > {
        try{
            console.log('req in repooo');
            let doctors = await getDoctorsRepo(req,this.doctorModels)
            return doctors

        }catch(err:any) {
            throw (err)
        }
    }
}

  
