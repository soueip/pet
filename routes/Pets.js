const express=require("express");
const petsRouter = express.Router();
const Pets=require("../models/Pets");

// add pet
petsRouter.post("/add", async(req, res)=>{
    try {
        const newPet= new Pets(req.body);
        const result= await newPet.save();
        res.send({pets:result,msg:"pet added succsesfully"}) 

    } catch (error) {
        console.log(error);
}});
// get all pet
petsRouter.get("/", async(req, res)=>{
    try {
       
        const result= await Pets.find();
        res.send({pets:result,msg:"all pets"}) 

    } catch (error) {
        console.log(error);
}});

// get game by id
petsRouter.get("/:id", async(req, res)=>{
    try {
       
        const result= await Pets.find();
        res.send({pets:result,msg:"one pet"}) 

    } catch (error) {
        console.log(error);
}});
// delete user*
petsRouter.delete("/:id",async(req,res)=>{
    try {
      let result=await Pets.findByIdAndDelete(req.params.id);
      res.send({msg:"pet is delete"})
    } catch (error) {
      console.log(error)
    }
   });
   
   petsRouter.put("/:id",async(req,res)=>{
    try {
      let result=await Pets.findByIdAndUpdate({_id:req.params.id},{$set:{...req.body}});
      res.send({msg:"pet is updated "})
    } catch (error) {
      console.log(error)
    }
   });


module.exports=petsRouter;