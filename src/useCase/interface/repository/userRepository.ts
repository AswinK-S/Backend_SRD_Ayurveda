import { Iuser } from "../../../entity/userEntity";

export interface IUserRepository {
    
    findUsersByEmail(email:String): Promise<Iuser | null >
    createUser(newUser: Iuser): Promise<Iuser>;

}