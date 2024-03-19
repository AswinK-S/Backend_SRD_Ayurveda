import { Query } from "../../../../../@types/entity/query";
import { IDoctor } from "../../../../../@types/entity/doctorEntity";
import doctorModel from "../../models/doctorModel";

export const updateDoctorProfile = async (query:Query,id:string):Promise<IDoctor| void> =>{
    try {
        console.log('q------',query);
        
        const updateQuery = {$set:{...query}}
        console.log('update query',updateQuery);
        const result = await doctorModel.findByIdAndUpdate({_id:id},updateQuery,{ new: true })
        console.log('q------------------res',result);
        if (result)return result
    } catch (error:any) {
        throw(error)
    }
}