import { Req } from "../../../../types/serverPackageTypes";
import treatmentModel from "../../models/treatmentModel";

export const getTreatmentsRepo = async(req:Req,treatMentModels:typeof treatmentModel)=>{
    try {
        const result =await treatMentModels.find({})
        console.log('found treatments---repo',result);
        return result
    } catch (error) {
        throw (error)
    }

}