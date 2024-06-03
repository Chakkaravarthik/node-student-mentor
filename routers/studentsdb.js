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

// student PUT api
studentsDBRouter.put('/:studentId', async (req,res)=>{
    const {studentId}=req.params;
    const {body}=req;
    const collection = db.collection("students");
    collection.updateOne({id:studentId},{$set:{...body}})
    res.send({msg:"student updated"})
})


//delete api 

studentsDBRouter.delete('/:studentId',async (req,res)=>{
    const {studentId}=req.params;
    const collection = db.collection("students");
    collection.deleteOne({id:studentId});
    res.send({msg:"student record deleted"})
})

export default studentsDBRouter;