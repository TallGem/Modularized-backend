const jwt = require("jsonwebtoken")
const userModel = require('../Model/user.model')

const Register = (req,res)=>{
   console.log(req.body);
   let newUser= new userModel(req.body)
   newUser.save()
}

const sigin = (req,res)=>{
   let {email, password} = req.body
   userModel.findOne({email:email})
   .then((user)=>{
      user.comparedPassword(password,(err, isMatch)=>{
         let schoolPortal =process.env.SECRET
         console.log(isMatch);
         if (isMatch){
            // res.send({status : true, message: "user found"})
            jwt.sign({email}, schoolPortal, {expiresIn: '1h'}, (err,token)=>{

               if(err){console.log(err);}
               else{
                  console.log(token);
                  res.send({status:true, message:"user found", token:token})
               }

            })
            console.log('user found')
         }
         else{
            res.send({status: false, message: "user not found"})
            console.log('user not found');
         }
      })
      // console.log("user found");
      
        
   })
  .catch((err)=>{
   // console.log(err);
   console.log("wrong credentials");
  })


  
}

const getDashboard =(req,res)=>{
   let schoolPortal =process.env.SECRET

   token = req.headers.authorization.split(" ")[1]

   jwt.verify(token, schoolPortal,(err,result)=>{
      if(err){
         console.log(err);
         res.send({status:false, message:""})
      }
      else{
         console.log(result);}
         res.send({status:true, message:"welcome",result})
   })

}
module.exports = {Register, sigin, getDashboard} 