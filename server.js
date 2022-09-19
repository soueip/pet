const express=require("express");
const passport = require("passport");
const app =express();
const cors = require('cors');
require("dotenv").config();
app.use(express.json());
app.use(cors());


const  dbConnect = require("./dbConnect");

dbConnect();

//routes
app.use("/user",require("./routes/user"));
app.use("/pets",require("./routes/Pets")); 
app.use("/reservation",require("./routes/reservation"));  


app.use(passport.initialize());
app.listen(process.env.PORT ,(err)=> err 
? console.log(err)
: console.log("server is connected..."+process.env.PORT) );