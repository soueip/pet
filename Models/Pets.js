const mongoose = require("mongoose");

const petsScheam= new mongoose.Schema({
nameuser:String,
image:String,
type:String,
description:String,
details:String,
age:Number,
category:String,
price:Number,
});

const Pets=mongoose.model("Pets",petsScheam);
module.exports=Pets;