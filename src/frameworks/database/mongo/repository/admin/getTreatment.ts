import treatmentModel from "../../models/treatmentModel";

export const  findTreatment = async (id:string, treatmentModels:typeof treatmentModel)=>{
    try {
        console.log('id in db--');
        const result = await treatmentModels.findById({_id:id})
        return result 
    } catch (error:any) {
        throw (error)
    }
}