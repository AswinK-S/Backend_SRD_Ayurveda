import { Next, Req, Res, Route } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { doctorController } from "./injections/injuction"; 

export function doctorRoute(router:Route){

    // login
    router.post('/login',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.doclogin(req,res,next)
    }))

    return router
}