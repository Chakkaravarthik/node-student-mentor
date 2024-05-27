import express from 'express'
import studentsRouter from './routers/students.js'

const server = express();

// middle ware - dont know correct usage 

server.use(express.json());

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

server.use('/students', studentsRouter);



// server hosting port
const port = 7000;

server.listen(port,()=>{
    console.log(`server is listening in port ${port}`);
})
