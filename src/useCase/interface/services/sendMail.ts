export interface ISendMail {
    sendEmailVerification(name:string,email:string,verificationCode:string):Promise<{success:boolean}>
}