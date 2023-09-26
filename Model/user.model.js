const mongoose = require("mongoose")

const bcrypt = require("bcryptjs")
let userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: { type: String }
})

let saltRounds = 10
userSchema.pre("save", function(next){
    bcrypt.hash(this.password, saltRounds).then((hash)=>{
        this.password = hash
        console.log(hash);
        next()
    }
    ).catch((err)=>console.log(err))
}

)
userSchema.methods.comparedPassword=function(userPassword, callback){
    bcrypt.compare(userPassword, this.password,(err,isMatch)=>{
        console.log(isMatch);
        if(err){
            return callback(err)
        }
        else{
            if (!isMatch){
                return callback(null, isMatch)
            }
            else{
                return callback(null,this)
            }
        }
    })
}

let user = mongoose.model("user",userSchema)

module.exports = user