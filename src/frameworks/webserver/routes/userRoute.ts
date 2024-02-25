import { Route,Req,Res,Next } from "../../types/serverPackageTypes";
import { userController } from "./injections/injuction";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";


export function userRoute(router:Route){

    //login Route
    router.post('/login',catchAsyncErrors((req:Req,res:Res)=>{
        userController.login(req,res)
    }))

    return router
}