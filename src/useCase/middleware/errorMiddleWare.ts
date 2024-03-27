import { Req,Res,Next } from "../../frameworks/types/serverPackageTypes";
import ErrorResponse from "./errorHandler";

export const errorMiddleware =(err:any , req:Req, res:Res, next:Next) =>{
    err.statusCode = err.statusCode || 500
    const message:string = err.message || 'internal server error'
    console.log('useCase/middleware/errormiddleware ');
    // console.log('err from errmdlware',err)


    // if (err.name === "castError") {
    //     const message = `Resource not found, invalid:${err.path}`;
    //     err = new ErrorResponse(400, message);
    //   }

      //duplicate key error =>for authentication
      if (err.name === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorResponse(400, message);
      }

      
    //   //wrong jwt error
    //   if (err.name === "jsonWebTokenError") {
    //     const message = `json web token is invalid,try again`;
    //     err = new ErrorResponse(400, message);
    //   }
    //   //token expired error
    //   if (err.name === "TokenExpiredError") {
    //     const message = `json web token has expired`;
    //     err = new ErrorResponse(400, message);
    //   }
    

      res.status(err.statusCode).json({
        success:false,
        message:message
      });
} 