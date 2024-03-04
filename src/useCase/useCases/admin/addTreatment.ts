import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ITreatmentRepository } from "../../interface/repository/treatmentRepository";
import ErrorHandler from "../../middleware/errorHandler";

export const addTreatment = async(
    treatmentRepository: ITreatmentRepository,
    req:Req,
    next:Next
)=>{

    try{
        console.log('add ctgry useCase :',req.body);
        const { treatmentName, subTreatment } = req.body;
        const treatmentExist = await treatmentRepository.existTreatment(treatmentName, subTreatment)

        if(treatmentExist ==='not exist'){

            //call the function to create a new treatment with subtreatments
            const result = await treatmentRepository.addTreatment(treatmentName, [subTreatment])

        }
        else if(treatmentExist ==='sub treatment not exists'){

        //call the function to push the new subtreatment
      const updatedTreatment = await treatmentRepository.addSubTreatment(
        treatmentName,
        subTreatment
      );
        }

    }catch(err:any){
        return next(new ErrorHandler(500,err.message))
    }
}