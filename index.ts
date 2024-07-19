import express from "express"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { prisma } from "./app/config/db";
import router from "./app/routes";
dotenv.config({path:'.env'})
const app = express();

// -----Database Connection-----
prisma.$connect().then(() => {
    console.log('Database connected successfully');
}).catch((err: any) => {
    console.log(err);
    process.exit(1);  
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// -----Routing----
app.use("/",router)

// -----Server Crea
app.listen(5000, () => {
    console.log("server is running on port 5000");
})
