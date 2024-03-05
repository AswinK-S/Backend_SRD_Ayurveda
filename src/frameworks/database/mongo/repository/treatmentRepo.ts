import { ITreatment } from "../../../../@types/entity/treatmentEntity";
import { ITreatmentRepository } from "../../../../useCase/interface/repository/treatmentRepository";


import {
    addTreatment,
    existTreatment,
    addSubTreatment
} from './treatment/index'

export class TreatmentRepository implements ITreatmentRepository {


    //addnewTreatment
     async addTreatment(name: string, subTreatments: string[]): Promise<ITreatment> {
        try{
            return await addTreatment(name,subTreatments)
        }catch(err){
            throw(err)
        }
    }


    // check if the treatment already exist in the database
    async existTreatment(treatmentName: string, subTreatment?: string | undefined): Promise<ITreatment|string> {
        try{
            return await existTreatment(treatmentName, subTreatment)
        }catch(err){
            throw err
        }
    }



    async addSubTreatment(treatmentName: string, subTreatment: string): Promise<ITreatment | null> {
       try {
        return await addSubTreatment(treatmentName,subTreatment)
       } catch (error) {
        throw error
       }
    }

}