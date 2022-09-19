const express = require('express');
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const isAuth = require('../middleware/passport');
const { 
    registerRules, 
    loginRules, 
    validation } = require('../middleware/validator');

//register

userRouter.post('/register',registerRules(),validation,async(req,res)=>{
    const {name,lastname,adress,phone,email,password} = req.body;
    try {
        const newuser = new User({name,lastname,adress,phone,email,password});
        
// check if the email exist
const searchedUser = await User.findOne ({email});

if (searchedUser){
    return res.status(400).send({msg: "email already exist"});
}


 // hash password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password,genSalt);
    newuser.password = hashedPassword;
        // generate a token
        //save the user
        const newUserToken= await newuser.save();
        const payload ={
            _id:newUserToken._id,
            name: newUserToken.name,
        };
        const token = await jwt.sign(payload,process.env.SecretOrKey,{
            expiresIn:3600,
        });
        res.status(200).send({newUserToken, msg:'user is saved', token: `Bearer ${token}`});
    } catch (error) {
        res.status(500).send('can not save the user'); 
        console.log(error) 
    }
})

//login
userRouter.post('/login',loginRules(),validation,async (req,res)=>{
    const {email,password}=req.body;
    try {
        //find if the user exist
        const searchedUser = await User.findOne({email})
        //if the email not exist
        if (!searchedUser){
            return res.status(400).send ({msg:"bad credential"})
        }
    //password are equals
    const match = await bcrypt.compare(password,searchedUser.password);
      
      if (!match){
         return res.status(400).send({msg:"can not get the user"});
      }

      //cree un token
      const payload = {
        _id: searchedUser._id,
        name: searchedUser.name,
      };
      const token = await jwt.sign(payload,process.env.SecretOrKey,{
        expiresIn:3600,
      });
      
      // send the user
      res
      .status(200)
      .send({user:searchedUser,msg:"success" ,token: `Bearer ${token}` });
    } catch(error) {
    
        res.status(500).send({msg:"can not get the client"});
        console.log(error)
    }
});

// get methode

userRouter.get ("/current", isAuth(), (req,res)=> {
   res.status(200).send({req:req.user});

});


userRouter.get("/", async(req, res)=>{
    try {
       
        const result= await User.find();
        res.send({user:result,msg:"users"}) 

    } catch (error) {
        console.log(error);
}});
// delete user*
userRouter.delete("/:id",async(req,res)=>{
    try {
      let result=await User.findByIdAndDelete(req.params.id);
      res.send({msg:"user is delete"})
    } catch (error) {
      console.log(error)
    }
   });
   
   userRouter.put("/:id",async(req,res)=>{
    try {
      let result=await User.findByIdAndUpdate({_id:req.params.id},{$set:{...req.body}});
      res.send({msg:"user is updated "})
    } catch (error) {
      console.log(error)
    }
   });


module.exports = userRouter;







