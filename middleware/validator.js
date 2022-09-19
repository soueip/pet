const {check,validationResult} = require ('express-validator');


exports.registerRules=()=>
    [
        check("name","name is required").notEmpty(),
        check("lastname","lastname is required").notEmpty(),
        check("adress","adress is required").notEmpty(),
        check("phone","phone is required").notEmpty(),
        check("email","email is required").notEmpty(),
        check("email","check your email").isEmail(),
        check("password","password most be betwen 8 and 16 character").isLength({
            min:8,
            max:16
        })
    ]
;
exports.loginRules=()=>
    [

        check("email","email is required").notEmpty(),
        check("email","check your email").isEmail(),
        check("password","password  must be between 6 character and 20 character").isLength({
            min:8,
            max:16
        })
    ];

 exports.validation = (req,res,next)=>{
   const errors = validationResult(req);
  if (!errors.isEmpty()){
      return res.status(400).send({
        errors:errors.array().map((el)=>
        ({msg:el.msg}))});
  }
  next();
}