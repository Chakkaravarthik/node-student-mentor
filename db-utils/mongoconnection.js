import {MongoClient} from 'mongodb';

// mongo service URI- uniform resourse itendifier
const dbcluster = 'localhost:27017';

const dbname = 'stumen';

const localuri = `mongodb://${dbcluster}/${dbname}`;





const dbuser = 'chakkaravarthik99'
const pass = encodeURIComponent('Sugar@99');
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