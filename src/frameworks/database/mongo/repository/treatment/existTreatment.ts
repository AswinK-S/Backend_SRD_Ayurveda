import { ITreatment } from "../../../../../@types/entity/treatmentEntity";
import treatmentModel from "../../models/treatmentModel";

export const existTreatment = async (treatmentName: string, subTreatment?: string): Promise<ITreatment | string> => {
    try {
        let existingTreatment = await treatmentModel.findOne({ name: treatmentName });
        console.log('existingTreatment from existTrtmnt -----',existingTreatment);
        let result: string | any
        result ='not exist'

        //check if the treatment exists
        if (existingTreatment) {
            
            //check if subtreatment exists
            if (subTreatment) {
                const existingSubTreatment = await treatmentModel.findOne({
                    name: treatmentName,
                    subTreatments: { $in: [subTreatment] }
                });

                if (existingSubTreatment) {
                    result = existingSubTreatment;
                } else {
                    result = 'sub treatment not exists';
                }
            } 
        }

        console.log('result from existing treatment-----',result);
        return result;
    } catch (err) {
        throw err;
    }
}