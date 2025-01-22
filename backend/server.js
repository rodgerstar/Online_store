import express from "express"
import cors from "cors"
import {connectDB} from "./config/db.js";
import yarnRouter from "./routes/yarnRoute.js";






//app config
const app = express()
const port = 4000


//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

//api end points
app.use("/api/yarn",yarnRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://Rodgerstar:<db_password>@cluster0.fa0gj.mongodb.net/?