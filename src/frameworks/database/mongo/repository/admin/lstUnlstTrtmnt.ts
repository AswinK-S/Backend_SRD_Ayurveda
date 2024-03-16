import { ITreatment } from "../../../../../@types/entity/treatmentEntity";
import treatmentModel from "../../models/treatmentModel";

export const trtmntStatusChange =async(id:string,treatmentModels:typeof treatmentModel):Promise<ITreatment |void>=>{

    try {
        const treatment = await treatmentModels.findOne({_id:id})
        const status =(treatment?.status )? false:true
        const result =await treatmentModels.findByIdAndUpdate({_id:id},{$set:{status:status}})
        if(result)return result
        
    } catch (error:any) {
        throw (error)
    }
}