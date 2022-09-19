const mongoose = require("mongoose");

const reservationScheam= new mongoose.Schema({
    nameuser:String,
    buyer:String,
    image:String,
    details:String,  
    category:String,
    price:Number,
});

const Reservation=mongoose.model("Reservation",reservationScheam);
module.exports=Reservation;