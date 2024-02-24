import mongoose from "mongoose";
require('dotenv').config()

const DB_connect:string =process.env.Mongo_Url || ''

const connectDb = async ()=>{
    try{
        await mongoose.connect(DB_connect)
        .then((data:any)=>console.log(`Db connected ${data.connection.host}`))
    }catch(error:any){
        console.log(error.message);
        
    }
}

export default connectDb