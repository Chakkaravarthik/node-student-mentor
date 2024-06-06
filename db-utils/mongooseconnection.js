import mongoose from "mongoose";

const DBname = "stumen"
const DBcluster = "localhost:27017"
const LocalURI = `mongodb://${DBcluster}/${DBname}`
const dbuser = 'chakkaravarthik99'
const pass = encodeURIComponent('Sugar@99');
const cloudURI = `mongodb+srv://${dbuser}:${pass}@cluster0.b1fwpte.mongodb.net/${DBname}?retryWrites=true&w=majority&appName=Cluster0`




const mongooseconnecttoDB = async ()=>{
    try{
        await mongoose.connect(cloudURI);
        console.log("mongoose connected")
    }catch(e){
        console.log(e);
    }
}

export default mongooseconnecttoDB;