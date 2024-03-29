import { ITreatment } from "../../../entity/treatmentEntity";

export interface ITreatmentRepository {
    addTreatment(name: string, subTreatments: string[]): Promise<ITreatment>;
    addSubTreatment(treatmentName: string, subTreatment: string): Promise<ITreatment | null>;
    existTreatment(treatmentName: string, subTreatment?: string | undefined): Promise<ITreatment|string> 
  }