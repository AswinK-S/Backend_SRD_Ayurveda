import mongoose from "mongoose";
// import doctorModel from "../frameworks/database/mongo/models/doctorModel";

export interface ISlot{
    doctorId:mongoose.Types.ObjectId,
    startTime:Date,
    endTime:Date,
    startDate:Date,
    endDate:Date,
    count:number,
    timePart:string
}