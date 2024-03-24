import { Next, Req, Res, Route } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { doctorController } from "./injections/injuction"; 
import { multerMid } from "../../middlewares/multer";

export function doctorRoute(router:Route){

    // login
    router.post('/login',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.doclogin(req,res,next)
    }))

    //get doctor details
    router.get('/getDetail/:id',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        doctorController.getDoctor(req,res,next)
    }))
    
    //image upload
    router.post('/image',multerMid.single('image'),catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        console.log('img req reached');
        doctorController.profileImg(req,res,next)
    }))

    //docment upload
    router.post('/document',multerMid.single('image'),catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        console.log('doc in rtr');
        doctorController.uploadDoc(req,res,next)
    }))

    //post doctor details
    router.post('/details',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        console.log('req for details');
        doctorController.doctorDetails(req,res,next)
    }))

    return router
}