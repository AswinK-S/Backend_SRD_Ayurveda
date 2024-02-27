import { Route,Req,Res,Next } from "../../types/serverPackageTypes";
import { userController } from "./injections/injuction";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";


export function userRoute(router:Route){

    //signup Route
    router.post('/signup',catchAsyncErrors((req: Req, res: Res, next: Next)=>{
        console.log('user data came from front end');
        userController.registerUser(req,res,next)
    }))

    //create user
    router.post('/create_user',catchAsyncErrors((req:Req,res:Res,next:Next)=>{

    }))

    //login Route
    router.post('/login',catchAsyncErrors((req:Req,res:Res)=>{
        userController.login(req,res)
    }))

    
    return router
}