import {MongoClient} from 'mongodb';

// mongo service URI- uniform resourse itendifier
const dbcluster = 'localhost:27017';

const dbname = 'stumen';

const localuri = `mongodb://${dbcluster}/${dbname}`;

const client = new MongoClient(localuri);

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