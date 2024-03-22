import treatmentModel from "../../models/treatmentModel";
import { ISubTreatment } from "../../../../../entity/subTrtmnt";


export const updateTreatmentRepo = async(id:string,subTrtments:ISubTreatment[],treatmentModels: typeof treatmentModel)=>{
    try{
        console.log('updt trt repo',id,"--",subTrtments);

        for(let i in subTrtments){
            console.log(subTrtments[i]); 
        };
        
        
        const result = await treatmentModels.updateOne(
            { _id: id },
            {
              $push: {
                subTreatments: { $each: subTrtments.map(item => ({ name: item.name })) }
              }
            }
          );

        console.log('reslt in repo-->',result);
    }catch(error:any){
        throw (error)
    }
}