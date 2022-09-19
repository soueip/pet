const mongoose=require("mongoose");

const  schema =mongoose.Schema;

const userSchema = new schema ({
       image: {type:String , 
                default:"https://cdn-icons-png.flaticon.com/512/3468/3468447.png"},
       name: {type:String, 
        required:true
    },
    lastname: {type:String, 
      required:true
  },
  adress: {type:String, 
    required:true
    }, 
  phone: {type:Number, 
      required:true
  },
       email:{type:String, 
        required:true
    },

       password:{type:String,
         required:true
    },
    isAdmin: {
        type: Boolean,
        default:false,
      }
});

const User = mongoose.model("User",userSchema);

module.exports = User;