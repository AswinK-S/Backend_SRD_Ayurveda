import userModel from "../../models/userModel";
import { Req } from "../../../../types/serverPackageTypes";

export const getUsersRepo = async(req:Req,userModels:typeof userModel)=>{
    try{
        let  result = await userModels.find({})
        console.log('get users result from repo--' ,result);
        return result
    }catch(err){
        console.log('err in getting users');
        throw (err)
    }
}