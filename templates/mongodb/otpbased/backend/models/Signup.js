const mongoose =require("mongoose")
const SignupSchema=new  mongoose.Schema({
    Username:{
        type:String,
        trim:true,
        require:true

    },
    // password:{
    //     type:String,
    //     require:true

    // },
    // confirmPassword:{
    //     type:String,
    // },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    

})
const userModel=new mongoose.model("signupUsers",SignupSchema);
module.exports=userModel;