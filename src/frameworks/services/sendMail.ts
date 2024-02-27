import nodemailer from 'nodemailer'
require('dotenv').config()

import { ISendMail } from '../../useCase/interface/services/sendMail'; 

export class SendMail implements ISendMail{

    private transporter:nodemailer.Transporter

    constructor(){
        this.transporter = nodemailer.createTransport({
            service: process.env.Mail_srvc,
            auth: {
              user: process.env.MAIL_from,
              pass: process.env.MAIL_key
            }
          });
    }


    sendEmailVerification(name: string, email: string, verificationCode: string): Promise<{ success: boolean; }> {
        
        return new Promise((resolve,reject)=>{

            const mailOptions = {
                from: process.env.MAIL_from,
                to: email,
                subject: 'SRD email verification',
                text: `Hi, ${name},\n\n Your mail Verification Code is ${verificationCode}. Do not share this code with anyone.`,
              };
              

              this.transporter.sendMail(mailOptions,(err)=>{
                if(err){
                    console.error('email error :',err.message);
                    reject({
                        success:false
                    })
                }else{
                    console.log('email sent');
                    resolve({
                        success:true
                    })
                }
              })
        })
    }

   
}


