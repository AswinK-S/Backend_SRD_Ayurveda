export interface IHashPassword {
    createHash(password:string):Promise<string>

    comparePassword(password:string,hashedPassword:string):Promise<boolean>
}