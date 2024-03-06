import { Iuser } from "../../../@types/entity/userEntity"
import { Next } from "../../../frameworks/types/serverPackageTypes"
import { IUserRepository } from "../../interface/repository/userRepoIntfc"
import ErrorHandler from "../../middleware/errorHandler"

export const block = async(userRepository:IUserRepository,id:string,next:Next)=>{

        try{
          return await userRepository.blockUser(id)
        }catch(err:any){
                return next(new ErrorHandler(500,err.message))
        }

}