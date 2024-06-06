import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// mongo service URI- uniform resourse itendifier
const dbcluster = 'localhost:27017';

const dbname = process.env.DB_dbname;

const localuri = `mongodb://${dbcluster}/${dbname}`;





const dbuser =  process.env.DB_user;
const pass = encodeURIComponent(process.env.DB_pass);
const cloudURI = `mongodb+srv://${dbuser}:${pass}@cluster0.b1fwpte.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(cloudURI);
const db = client.db(dbname);

const connectToDB = async ()=>{
    try{
        await client.connect()
        console.log("DB connected")
    }catch(e){
        console.log(e);
        process.exit(1);
        
    }
};

export {db};
export  default connectToDB;