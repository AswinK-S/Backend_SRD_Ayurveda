import { Iadmin } from "../../../entity/adminEntity"
import { IadminJwt } from "../../interface/services/jwt.types"
import { IToken } from "../../interface/services/jwt.types"
import { IadminRepository } from "../../interface/repository/adminRepository"
import { IHashPassword } from "../../interface/services/hashPassword"
import { Next } from "../../../frameworks/types/serverPackageTypes"
import ErrorHandler from "../../middleware/errorHandler"

export const adlogin = async(
    adminRepository:IadminRepository,
    bcrypt:IHashPassword,
    token:IadminJwt,
    email:string,
    password:string,
    next:Next
)=>{

try{
   let admin = await adminRepository.findAdminByEmail(email)
   console.log('admin :>>',admin);
   if(!admin)return next (new ErrorHandler(400, 'invalid email id'))

   const hashedPassword = admin.password
   const matchedPsswrd = await bcrypt.comparePassword(password,hashedPassword)

   if(!matchedPsswrd)return next (new ErrorHandler(401,'invalid password'))

   admin.password =''
   const tokens = await token.createAccessAndRefreshToken(admin?._id as string)
   return{
       admin,
       tokens,
   }

}catch(error:any){
    console.log(error.message);
}
}   