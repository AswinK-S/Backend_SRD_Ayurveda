import { IadminRepository } from "../../../../useCase/interface/repositoryIntrfce/adminRepository";
import { Iadmin } from "../../../../entity/adminEntity";
import adminModel from "../models/adminModel";
import { ISubTreatment } from "../../../../entity/subTrtmnt";

import {
    findAdminByEmail,
    getUsersRepo,
    getDoctorsRepo,
    getTreatmentsRepo,
    trtmntStatusChange,
    findTreatment,
    rmvSubTrtmntRepo,
    updateTreatmentRepo
} from './admin/index'


import { Req } from "../../../types/serverPackageTypes";
import { Iuser } from "../../../../entity/userEntity";
import userModel from "../models/userModel";
import doctorModel from "../models/doctorModel";
import { IDoctor } from "../../../../entity/doctorEntity";
import { ITreatment } from "../../../../entity/treatmentEntity";
import treatmentModel from "../models/treatmentModel";


export class AdminRepository implements IadminRepository {

    constructor(
        private adminModels: typeof adminModel,
        private userModels: typeof userModel,
        private doctorModels: typeof doctorModel,
        private treatmentModels: typeof treatmentModel
    ) {}

    async findAdminByEmail(email: string): Promise<Iadmin | null> {
        try {
            const adminExist = await findAdminByEmail(email, this.adminModels)
            return adminExist
        } catch (err: any) {
            throw (err)
        }
    }

    //get all users
    async getUsersAdmnRepo(req: Req): Promise<Iuser[] | null> {
        try {
            const users = await getUsersRepo(req, this.userModels)
            return users
        } catch (err: any) {
            throw (err)
        }
    }

    //get all treatments
    async getTretmentsAdmnRepo(req:Req):Promise<ITreatment[]|null>{
        try {
            const treatments = await getTreatmentsRepo(req,this.treatmentModels)
            return treatments
        } catch (error:any) {
           throw (error) 
        }
    }

    // update treatments 
    async updateTrtmntAdmnRepo(id:string,subTreatments:ISubTreatment[]):Promise<{treatment:ITreatment|null,message:string}>{
        try {
            console.log('admn trt repo id-->',id,'s->',subTreatments);
            const result = await updateTreatmentRepo(id,subTreatments,this.treatmentModels)
             return result
        } catch (error:any) {
            throw (error)
        }
    }

    //get single treatment info
    async findTreatmentAdmnRepo(id:string):Promise<ITreatment|void>{
        try {
            const result = await findTreatment(id,this.treatmentModels)
               if(result) return result

        } catch (error:any) {
            throw(error)
        }
    }

    //treatment status change
    async getTrtmntStsAdmnRep(id:string):Promise<ITreatment|void>{
        try {
            const result = await trtmntStatusChange(id,this.treatmentModels)
            return result
        } catch (error:any) {
            throw (error)
        }
    }

    //remove subTreatment
    async rmvSubTrtmntAdmnRepo(id:string,subName:string):Promise<ITreatment | void>{
        try {
            console.log('id---in admn rep',id,'  sub--',subName);
            const result = await rmvSubTrtmntRepo(id,subName,this.treatmentModels)
            if(result)return result
        } catch (error:any) {
            throw (error)
        }
    }

    //get all doctors 
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

  
