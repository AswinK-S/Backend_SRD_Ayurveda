import { Route,Req,Res,Next } from "../../types/serverPackageTypes";
import { userController } from "./injections/injuction";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";


export function userRoute(router:Route){

    //treatment Route 
    router.get('/userTreatments',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        console.log('trt--');
        userController.treatments(req,res,next)
    }))

    //signup Route
    router.post('/signup',catchAsyncErrors((req: Req, res: Res, next: Next)=>{
        console.log('user data came from front end');
        userController.registerUser(req,res,next)
    }))

    //create user
    router.post('/create_user',catchAsyncErrors((req:   Req,res:Res,next:Next)=>{
        userController.createUser(req,res,next)
    }))

    //login Route
    router.post('/login',catchAsyncErrors((req:Req,res:Res ,next:Next)=>{
        userController.login(req,res,next)
    }))

    
    return router
}