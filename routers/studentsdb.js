import {db} from '../db-utils/mongoconnection.js';
import express from 'express';

const studentsDBRouter = express.Router();


//student GET api

studentsDBRouter.get('/', async (req,res)=>{
    const collection = db.collection("students");

    const data = await collection.find({}).toArray();
    res.send(data);
})

//student POST api (create)

studentsDBRouter.post('/', async (req,res)=>{
    const collection = db.collection("students");
    const {body}=req;
    await collection.insertOne({
        ...body,
        id:Date.now().toString(),
        teacherId:null
    })
    res.send({msg:"student added"})

})

export default studentsDBRouter;