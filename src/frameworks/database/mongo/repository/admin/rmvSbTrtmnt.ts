import treatmentModel from "../../models/treatmentModel";

export const rmvSubTrtmntRepo = async(id:string,subName:string,treatmentModels:typeof treatmentModel)=>{
    try {
        const result = await treatmentModels.findByIdAndUpdate({_id:id},{$pull:{subTreatments:{name:subName}}},{new:true})
        console.log('rmv sb trt rslt--',result);
        return result
    } catch (error:any) {
        console.log('err in rmv sb trt',error.message);
        throw (error)
    }
}