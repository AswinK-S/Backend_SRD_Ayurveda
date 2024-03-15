import { Next, Req, Res, Route } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { doctorController } from "./injections/injuction"; 
import { multerMid } from "../../middlewares/multer";

export function doctorRoute(router:Route){

    // login
    router.post('/login',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.doclogin(req,res,next)
    }))

    router.post('/image',multerMid.single('image'),catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        console.log('img req reached');
        doctorController.profileImg(req,res,next)
    }))

    return router
}