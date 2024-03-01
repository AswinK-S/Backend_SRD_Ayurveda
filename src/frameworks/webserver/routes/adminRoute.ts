import { Route,Req,Res,Next } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { adminController } from "./injections/injuction";

export function adminRoute(router:Route){

    // adminlogin
    router.post('/adlogin',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.adlogin(req,res,next)
    }) )
}