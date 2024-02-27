import bcrypt from 'bcrypt'
import { IHashPassword } from "../../useCase/interface/services/hashPassword";

export class Encrypted implements IHashPassword{

    constructor(){}

    //function to hash password
     async createHash(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password,10)
        return hashedPassword
    }

    //function to compare password
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
       const comparePassword = await bcrypt.compare(password,hashedPassword) 
       return comparePassword
    }
}