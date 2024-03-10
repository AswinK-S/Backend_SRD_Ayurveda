import { ITreatment } from "../../../../@types/entity/treatmentEntity";

import mongoose, { Schema, Model } from "mongoose";

const treatmentSchema: Schema<ITreatment> = new mongoose.Schema({
    name: { type: String, required: true },
    subTreatments: [{
      name: { type: String, required: true },
      status: { type: Boolean, default: true },
    }],
  });
  
const treatmentModel: Model<ITreatment> = mongoose.model('Treatment', treatmentSchema)
export default treatmentModel
