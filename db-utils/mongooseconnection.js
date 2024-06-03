import mongoose from "mongoose";

const DBname = "stumen"
const DBcluster = "localhost:27017"
const LocalURI = `mongodb://${DBcluster}/${DBname}`
const mongooseconnecttoDB = async ()=>{
    try{
        await mongoose.connect(LocalURI);
        console.log("mongoose connected")
    }catch(e){
        console.log(e);
    }
}

export default mongooseconnecttoDB;