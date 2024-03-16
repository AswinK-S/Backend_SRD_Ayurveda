interface ICloudinaryRepository{
    saveToCloudinary(file:Object,folder:string):Promise<any>
}

export default ICloudinaryRepository