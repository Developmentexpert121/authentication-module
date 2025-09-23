// const mongoose =require("mongoose")
// const SignupSchema=new  mongoose.Schema({
//     Username:{
//         type:String,
//         trim:true,
//         required:true,
//     },
//     password:{
//         type:String,
//         required:true,

//     },
//     confirmPassword:{
//         type:String,
//         required:true,

//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         lowercase: true
//     },
    

// })
// const userModel=new mongoose.model("signupUsers",SignupSchema);
// module.exports=userModel;



const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
  email: { type: String },
password: { type: String },
dob: { type: String },
username: { type: String },
});


const userModel = new mongoose.model("signupUsers", SignupSchema);
module.exports = userModel;