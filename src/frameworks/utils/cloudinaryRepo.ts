import ICloudinaryRepository from "../../useCase/interface/repositoryIntrfce/cloudinaryRepo"
import cloudinary from '../services/cloudinary'
import fs from 'fs'

export  class Cloudinary implements ICloudinaryRepository{
    constructor(){}
    async saveToCloudinary(file: any,folder:string) {
        console.log('file path',file.path);
        const result = await cloudinary.v2.uploader.upload(file?.path,{folder})
        
        if (typeof file.path === 'string' && file.path.trim().length > 0) {
            fs.unlink(file.path, (err) => {
              if (err) {
                console.error('Error deleting file:', err);
              }
            });
          } else {
            console.error('Invalid file path:', file.path);
          }
        file = result.secure_url
        
       
        return file
    }
  }