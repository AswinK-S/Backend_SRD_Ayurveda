import { Route,Req,Res,Next } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { adminController } from "./injections/injuction";

export function adminRoute(router:Route){

    // adminlogin
    router.post('/adlogin',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.adlogin(req,res,next)
    }) )

    //addTreatment
    router.post('/addTreatment',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.add_treatment(req,res,next)
    }))

    // add Doctor
    router.post('/add_Doc',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.addDoc(req,res,next)
    }))

    // list/unlist Doctor route
    router.post('/doctorStatus/:id',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.docStatus(req,res,next)
    }))


    // block/unblock  user route
    router.post('/block_User/:id',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.block(req,res,next)
    }))

    

    return router
}