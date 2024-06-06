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


export default teacherModel;