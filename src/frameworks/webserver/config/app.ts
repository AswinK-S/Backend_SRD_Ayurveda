import express,{ Express } from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app: Express = express()

//cors setup
app.use(cors({
    origin:'http://localhost:5173/',
    credentials:true,
    methods:['GET','POST'],
    optionsSuccessStatus:200
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

export default app