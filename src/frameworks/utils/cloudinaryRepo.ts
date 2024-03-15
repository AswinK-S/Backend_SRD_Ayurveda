import ICloudinaryRepository from "../../useCase/interface/repositoryIntrfce/cloudinaryRepo"
import cloudinary from '../services/cloudinary'

export  class Cloudinary implements ICloudinaryRepository{
    constructor(){}
    async saveToCloudinary(file: any) {
        const result = await cloudinary.v2.uploader.upload(file?.path)
        file = result.secure_url
        return file
    }
  }