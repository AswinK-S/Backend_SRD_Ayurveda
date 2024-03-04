import { Request } from "express";
import { Iuser } from "./entity/userEntity";

declare global{
    namespace Express{
        interface Request{
            user?:Iuser
        }
    }
}