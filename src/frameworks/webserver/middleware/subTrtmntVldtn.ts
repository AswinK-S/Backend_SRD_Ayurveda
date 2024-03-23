import { NextFunction } from "express";
import { Req, Res } from "../../types/serverPackageTypes";
import { ISubTreatment } from "../../../entity/subTrtmnt";


export const subTrtmdlware = (req:Req,res:Res,next:NextFunction)=>{
    try {
        const sub:ISubTreatment[] = req.body.subTreatments
        const isEmpty:boolean = sub.map((item)=>item.name.trim()).some((value)=>value ==='')

        if(isEmpty){
            res.json({message:'empty data is not allowed'})
            return
        }

        const set = new Set()
        for(let i in sub){
            if(set.has(sub[i].name)){
                res.json({message:'duplicate treatment name is not allowed'})
                return
            }
            set.add(sub[i].name);

        }
        next();

    } catch (error:any) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}