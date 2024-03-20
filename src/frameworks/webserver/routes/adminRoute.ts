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

    //getTreatments
    router.get('/treatments',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.treatments(req,res,next)
    }))

    //change treatment status
    router.patch('/trtMntStatus/:id',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.treatmentStatus(req,res,next)
    }))

    // get single Treatment info 
    router.get('/treatment/:id',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        console.log('req in router');
        adminController.treatmentDetail(req,res,next)
    }))

//------------------------------------------------------------------------------Doctors
    // add Doctor
    router.post('/add_Doc',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.addDoc(req,res,next)
    }))

    // list/unlist Doctor route
    router.post('/doctorStatus/:id',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.docStatus(req,res,next)
    }))

    // get Doctors
    router.get('/getDoctors',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.getDoctors(req,res,next)
    }))

//---------------------------------------------------------------------------------------users

    // block/unblock  user route
    router.post('/block_User/:id',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.block(req,res,next)
    }))

    //get users
    router.get('/users',catchAsyncErrors((req:Req,res:Res,next:Next)=>{
        adminController.getUsers(req,res,next)
    }))

    return router
}