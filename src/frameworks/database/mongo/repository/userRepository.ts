import userModel from "../models/userModel";
import { IUserRepository } from "../../../../useCase/interface/repositoryIntrfce/userRepoIntfc";
import { Iuser } from "../../../../entity/userEntity";

import {
    findUserByEmail,
    createUser,
    blckUsrRepo,
} from './user/index'
export class UserRepository implements IUserRepository {

   constructor(private userModels:typeof userModel){}

   //check the user exists
   async findUsersByEmail(email:string):Promise <Iuser | null>{
    const userExist = await findUserByEmail(email,this.userModels)
    console.log('repository find user with email :',userExist);
    return userExist
   }

    //createUser
    async createUser(newUser: Iuser): Promise<Iuser> {
        return await createUser(newUser,this.userModels)
    }

    //block or unblock user
    async blockUser(id:string):Promise<string>{
        return await blckUsrRepo(id)
    }
    
}
