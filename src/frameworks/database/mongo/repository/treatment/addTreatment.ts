import { ITreatment } from "../../../../../@types/entity/treatmentEntity";
import treatmentModel from "../../models/treatmentModel";

export const addTreatment = async (name:string,subTreatments:string[]):Promise<ITreatment> =>{
    try {
        let newTreatment = await treatmentModel.create({name,subTreatments})
        console.log('new Treatment :',newTreatment);
        return newTreatment.toObject() as ITreatment;

    }catch(err){
        throw(err)
    }
}


export const addSubTreatment = async (treatmentName: string, subTreatment: string): Promise<ITreatment | null> => {
    try {
      // Find the existing treatment
      let existingTreatment = await treatmentModel.findOne({ name: treatmentName });
  
      if (existingTreatment) {
        // Check if the subTreatment already exists in the treatments
        if (!existingTreatment.subTreatments.includes(subTreatment)) {
          // If not, push the new subTreatment and save
          existingTreatment.subTreatments.push(subTreatment);
          existingTreatment = await existingTreatment.save();
        }
        return existingTreatment.toObject() as ITreatment;
      } else {
        return null; // Treatment does not exist
      }
    } catch (err) {
      throw err;
    }
  };