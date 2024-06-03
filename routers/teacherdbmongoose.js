import teacherModel from "../db-utils/model.js"; // teacherNodel
import express from 'express'
// mongoose db

const teachersRouter = express.Router();

// Get api for teachers using mongoose

teachersRouter.get('/', async (req,res)=>{
    try{
        const teachers = await teacherModel.find({});
        res.send(teachers);
    }catch(e){
        res.status(500).send({msg:'something went wrong'});
        console.log(e);
    }

})

// POST (create) api for teachers using mongoose

teachersRouter.post('/', async (req,res)=>{
    const obj = req;
    try{
        const newteacher = await new teacherModel({
            ...body,id:Date.now().toString()
    
        });
        await newteacher.save(); // validates and insert the record 
        res.send({msg:'teacher craeetd sussessful'}); 
    }catch(e){
        res.status(500).send({msg:'something went wrong'});
        console.log(e);
    }

})

// PUT api for teachers using mongoose

teachersRouter.put('/:teacherId', async (req,res)=>{
    const {teacherId} = req.params;
    const {body}=req;
    const teacherobj = {
        ...body,id:Date.now().toString()
    }
    try{
        await new teacherModel(teacherobj).validate();
        await teacherModel.updateOne({id:teacherId}, {$set:teacherobj})
        res.send({msg:'teacher updated sussessful'}); 
    }catch(e){
        res.status(500).send({msg:'something went wrong'});
        console.log(e);
    }

})

// PUT api for teachers using mongoose

teachersRouter.delete('/:teacherId', async (req,res)=>{
    const {teacherId} = req.params;
    try{
        await teacherModel.deleteOne({id:teacherId})
        res.send({msg:'teacher deleted'})
    }catch(e){
        res.status(500).send({msg:'something went wrong'});
        console.log(e);
    }

})



export default teachersRouter;