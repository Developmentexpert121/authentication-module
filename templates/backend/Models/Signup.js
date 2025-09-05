const mongoose =require("mongoose")
const SignupSchema=new  mongoose.Schema({
    Username:{
        type:String,
        trim:true
    },
    password:{
        type:String,

    },
    confirmPassword:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    

})
const userModel=new mongoose.model("signupUsers",SignupSchema);
module.exports=userModel;