import express,{ Express } from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { userRoute } from "../routes/userRoute";

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//cors setup
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:['GET','POST','PUT','PATCH'],
    optionsSuccessStatus:200
}))





app.use('/user',userRoute(express.Router()))

export default app