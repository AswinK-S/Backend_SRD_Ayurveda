import { ITreatment } from "../../../../@types/entity/treatmentEntity";

import mongoose, { Schema, Model } from "mongoose";

const treatmentSchema: Schema<ITreatment> = new mongoose.Schema({
    name: { type: String, required: true },
    subTreatments: [{ type: String, required: true }],
})

const treatmentModel: Model<ITreatment> = mongoose.model('Treatment', treatmentSchema)
export default treatmentModel
