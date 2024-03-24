import doctorModel from "../../models/doctorModel";

export const findById = async(id:string,doctorModels:typeof doctorModel)=>{
    try {
        const result = await doctorModels.findById({_id:id})
        return result
    } catch (error:any) {
        throw (error)
    }
}