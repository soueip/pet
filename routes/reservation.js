const express=require("express");
const reservationRouter = express.Router();
const Reservation=require("../models/reservation");

// get add game
reservationRouter.post("/add", async(req, res)=>{
    try {
        const newReservation= new Reservation(req.body);
        const result= await newReservation.save();
        res.send({reservation:result,msg:"reservation added succsesfully"}) 

    } catch (error) {
        console.log(error);
}});
// get all games
reservationRouter.get("/", async(req, res)=>{
    try {
       
        const result= await Reservation.find();
        res.send({reservation:result,msg:"all Reservation"}) 

    } catch (error) {
        console.log(error);
}});

// get game by id
reservationRouter.get("/:id", async(req, res)=>{
    try {
       
        const result= await Reservation.find();
        res.send({reservation:result,msg:"one reservation"}) 

    } catch (error) {
        console.log(error);
}});
// delete user*
reservationRouter.delete("/:id",async(req,res)=>{
    try {
      let result=await Reservation.findByIdAndDelete(req.params.id);
      res.send({msg:"reservation is delete"})
    } catch (error) {
      console.log(error)
    }
   });
   
   reservationRouter.put("/:id",async(req,res)=>{
    try {
      let result=await Reservation.findByIdAndUpdate({_id:req.params.id},{$set:{...req.body}});
      res.send({msg:"reservation is updated "})
    } catch (error) {
      console.log(error)
    }
   });


module.exports=reservationRouter;