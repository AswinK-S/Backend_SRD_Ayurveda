import { IUserRepository } from "../interface/repository/userRepository";

import { IUserUseCase } from "../interface/useCase/userUseCase";

import { Iuser } from "../../entity/userEntity";


export class UserUseCase implements IUserUseCase{

    private readonly userRepository : IUserRepository;

    constructor(
        userRepository:IUserRepository,
    )
    {
        this.userRepository:userRepository;
    }

    async login ({email,password}:{email:string; password:string}):Promise <{user:Iuser} | void>{
        try{
            return await this.login(
            this.userRepository,
            email,
            password
            )
            

        }catch(error:any){
            console.log(error.message);
        }
    }
}