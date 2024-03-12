export interface ISendMail {
    sendEmailVerification(name:string,email:string,verificationCode:string):Promise<{success:boolean}>
    sendMailToDoc( email: string, password: string): Promise<{ success: boolean; }>
}