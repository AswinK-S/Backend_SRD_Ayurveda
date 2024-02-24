import userModel from "../models/userModel";
import { IUserRepository } from "../../../../useCase/interface/repository/userRepository";
import { Iuser } from "../../../../entity/userEntity";
import {findUserByEmail} from './user/index'

export class UserRepository implements IUserRepository {

    constructor(private userModels:typeof userModel){}

   async findUsersByEmail(email:string):Promise <Iuser | null>{
    const userExist = await findUserByEmail(email,this.userModels)
    return userExist
   }
    
     

}
