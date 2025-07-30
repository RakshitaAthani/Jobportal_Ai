import mongoose from "mongoose";
const userschema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phoneNumber:{type:Number},
    resume:{type:String},
    isadmin:{type:Boolean,default:false},
    highestdegree:{type:String},
    skills:[],
    experience:{type:String},
    currentcompany:{type:String},
    currentrole:{type:String},
    currentlocation:{type:String},
    noticeperiod:{type:Number},
    preffeeredlocation:{type:String},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
    profilepic:{type:String}
})

const usermodel=mongoose.model("users",userschema);
export default usermodel
