import app from "./frameworks/webserver/config/app";
import connectDb from "./frameworks/webserver/config/db";

const port =3000

const start = ()=>{
    app.listen(port,()=>{
        console.log(`server started on http://localhost/${port}`);
        connectDb()
    })
}

start()