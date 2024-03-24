import { IDoctor } from "../../../../../entity/doctorEntity";
import doctorModel from "../../models/doctorModel";

export const uploadDocument =  async (image:string,id:string,doctorModels:typeof doctorModel):Promise<IDoctor|void>=>{
    try{
        const res = await doctorModels.findByIdAndUpdate({_id:id},{$set:{document:image}},{$upsert:true,new:true})
        console.log('res from mongo repo--',res);
        if(res){
            return res
        }
    }catch(error:any) {
        throw (error)
    }
}