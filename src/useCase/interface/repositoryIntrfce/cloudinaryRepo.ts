interface ICloudinaryRepository{
    saveToCloudinary(file:Object):Promise<any>
}

export default ICloudinaryRepository