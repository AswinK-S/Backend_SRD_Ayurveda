import treatmentModel from "../../models/treatmentModel";

export const rmvSubTrtmntRepo = async(id:string,subName:string,treatmentModels:typeof treatmentModel)=>{
    try {
        const result = await treatmentModels.findByIdAndUpdate({_id:id},{$pull:{subTreatments:{name:subName}}},{new:true})
        return result
    } catch (error:any) {
        throw (error)
    }
}