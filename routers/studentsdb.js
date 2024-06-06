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


// assign a teacher id to a student 

studentsDBRouter.patch('/assign-teacher/:studentId', async (req,res)=>{
    const {body}=req;
    const {studentId} = req.params;
    const {teacherId} = body;
    //get student obj and teacher obj

    const stuobj = await db.collection('students').findOne({id:studentId});
    const teachobj = await db.collection('teachers').findOne({id:teacherId});
    if(stuobj && teachobj){
        //assign teacher id to students data
      await  db.collection('students').updateOne({id:studentId}, {$set :{teacherId:teacherId}});
        // assign students id to teachers data
      await db.collection('teachers').updateOne({id:teacherId}, {$set : {studentsId: [...teachobj.studentsId, studentId]}})

      res.send({msg:'teacher assignment success'})
        
    }else{
        res.status(400).send({msg: 'invalid student or teacher'});
    }
})
export default studentsDBRouter;