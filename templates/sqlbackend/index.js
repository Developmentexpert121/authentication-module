const express= require("express")
const app =express();
const authRoutes=require("./routers/authrouters")
const cookieParser = require("cookie-parser");
const cors =require('cors')
const db = require("./models");

const port =8080;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true,                 
}));
app.use("/api/auth", authRoutes);




app.get("/",(req,res)=>{
    res.send("hallo bruder ! wie gehts");
})
app.listen(port,()=>{
    console.log(`listenning at port${port}`);

})