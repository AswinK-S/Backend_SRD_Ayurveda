import { Req,Res,Next } from "../../frameworks/types/serverPackageTypes";
import ErrorResponse from "./errorHandler";

export const errorMiddleware =(err:any , req:Req, res:Res, next:Next) =>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'internal server error'
    console.log('useCase/middleware/errormiddleware ');
    console.log(err.message)

    
} 