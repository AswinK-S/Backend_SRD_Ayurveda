import treatmentModel from "../../models/treatmentModel";

export const existTreatment = async (treatmentName: string, subTreatment?: string): Promise<string> => {
    try {
        let existingTreatment = await treatmentModel.findOne({ name: treatmentName });
        let result: string = 'not exist';

        //check if the treatment exists
        if (existingTreatment) {
            
            //check if subtreatment exists
            if (subTreatment) {
                const existingSubTreatment = await treatmentModel.findOne({
                    name: treatmentName,
                    subTreatments: { $in: [subTreatment] }
                });

                if (existingSubTreatment) {
                    result = 'treatment and sub-treatment exist';
                } else {
                    result = 'sub treatment not exists';
                }
            } else {
                result = 'treatment exists';
            }
        }

        return result;
    } catch (err) {
        throw err;
    }
}