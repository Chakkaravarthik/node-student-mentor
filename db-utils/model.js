import mongoose from "mongoose";


// teacher schema creation

const teacherSchema = new mongoose.Schema({
    id:{
        type:"String",
        required:true,
    },
    name:{
        type:"String",
        required:true,
    },
    batch:{
        type:"String",
        required:true,
    },
    studentsId:{
        type:"Array",
        required:true,
     
    }
})

// teaccher model creation
const teacherModel = new mongoose.model("teacher", teacherSchema,"teachers");


const userschema = new mongoose.Schema({
    id:{
        type:"String",
        required:true,
    },
    name:{
        type:"String",
        required:true,
    },
    email:{
        type:"String",
        required:true,
    },
    role:{
        type:"string",
        required:true,
    },
    password:{
        type:'string',
        required:true,
    },
    isVerified:{
        type:'boolean',
        required: true,
    },
})

const userModel = new mongoose.model('user', userschema , 'users');


export { teacherModel, userModel} ;