import { Iuser } from "../../../../../@types/entity/userEntity";
import userModel from "../../models/userModel";

export const createUser = async (newUser:Iuser,userModels:typeof userModel): Promise <Iuser> =>{
    try{
        const user = await userModels.create(newUser)
        await user.save()
        return user
    }catch(err){
        throw err
    }
}