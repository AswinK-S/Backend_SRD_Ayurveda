import { Iuser } from "../../../@types/entity/userEntity";

export interface IUserRepository {
    
    findUsersByEmail(email:String): Promise<Iuser | null >
    createUser(newUser: Iuser): Promise<Iuser>;
    blockUser(id:string):Promise<string>
}