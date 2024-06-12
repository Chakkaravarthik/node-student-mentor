import express from 'express'
import studentsRouter from './routers/students.js'
import teacherRouter from './routers/teacher.js'
import connectToDB from './db-utils/mongoconnection.js'
import studentsDBRouter from './routers/studentsdb.js'
import mongooseconnecttoDB from "./db-utils/mongooseconnection.js"
import teachersRouter from './routers/teacherdbmongoose.js'
import cors from 'cors'
import registerrouter from './routers/auth/register.js'
import loginrouter from './routers/auth/login.js'



// db connect 
await connectToDB();
// mongoose DB connect
await mongooseconnecttoDB();

const server = express();

// middle ware - dont know correct usage 

server.use(express.json());

server.use(cors());

// server GET api

server.get('/',((req,res)=>{
    res.send({message:"server is working"});
}))

// server POST api 

server.post('/',((req,res)=>{
    const {body}= req;
    console.log(body)
    res.send({msg:"post method called"})
}))

// server PUT api 

server.put('/',((req,res)=>{
    const {body}= req;
    console.log(body)
    res.send({msg:"put method called"})
}))

//server DELETE api

server.delete('/',((req,res)=>{
    res.send({msg:"Delete method called "})
}))


///   students route connect 

server.use('/students', studentsDBRouter);
server.use('/teachers', teachersRouter);
server.use('/register', registerrouter);
server.use('/login', loginrouter);



// server hosting port
const port = 7000;

server.listen(port,()=>{
    console.log(`server is listening in port ${port}`);
})
