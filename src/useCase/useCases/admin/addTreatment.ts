import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ITreatmentRepository } from "../../interface/repositoryIntrfce/treatmentRepository";
import ErrorHandler from "../../middleware/errorHandler";

export const    addTreatment = async (
    treatmentRepository: ITreatmentRepository,
    req: Req,
    next: Next
) => {
    try {
        console.log('add treatment useCase :', req);
        const { treatmentName, subTreatments }:any = req;
        const treatmentExist = await treatmentRepository.existTreatment(treatmentName, subTreatments)
        console.log('treatmentEsixt frm add trtmnt :',treatmentExist);
        if (treatmentExist === 'not exist') {
            console.log('trtmntNme :',treatmentName,'subTrtmnt :',subTreatments);
            const result = await treatmentRepository.addTreatment(treatmentName, subTreatments)
            console.log('result from addTretmnt UseCase', result);
            // Ensure result is not void before returning
            if (result) {
                return { treatment: result ,message:'added treatment'};
            } else {
                // Handle the case where result is void
                console.error('Failed to add treatment');
                return; // Return void
            }
        }
        else if (treatmentExist === 'sub treatment not exists') {
            const updatedTreatment = await treatmentRepository.addSubTreatment(treatmentName, subTreatments);
            console.log('result from addTretmnt UseCase :', updatedTreatment);
            // Ensure updatedTreatment is not void before returning
            if (updatedTreatment) {
                return { treatment: updatedTreatment ,message:'added subTreatment'};
            } else {
                // Handle the case where updatedTreatment is void
                console.error('Failed to add sub-treatment');
                return; // Return void
            }
        }
        else if(typeof treatmentExist !== 'string'){
            console.log('Treatment and sub-treatment already exist');
            return { treatment:treatmentExist, message: 'Treatment and sub-treatment already exist' };
        }
    } catch (err: any) {
        return next(new ErrorHandler(500, err.message))
    }
}

