import { NextFunction,Request,Response } from "express";

export const catchAsyncErrors =(theFnc:any)=>(req:Request,res:Response,next:NextFunction)=>{
    Promise.resolve(theFnc(req,res,next)).catch(next)
}