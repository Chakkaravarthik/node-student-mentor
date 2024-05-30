import express from 'express';
import {students,teachers} from './localVariables.js';

const teacherRouter = express.Router(); // creating teacher router

// GET api for teacher

teacherRouter.get('/',((req,res)=>{
    res.send({teachers})
}))

// POST api for teacher (create)

teacherRouter.post('/',((req,res)=>{
    const {body} = req;
    teachers.push({id:Date.now().toString(),studentsId:[],...body});
    res.send({msg:"teacher created success"})
}))

// PUT api for teacher

teacherRouter.put('/:teacherId',((req,res)=>{
    const {teacherId} = req.params;
    const {body}=req;
    const index = teachers.findIndex(t=>t.id===teacherId);
    teachers[index]={id:teacherId,...body};
    res.send({msg:"teacher updated"})
}))

// Delete api for teacher

teacherRouter.delete('/:teacherId',((req,res)=>{
    const {teacherId} = req.params;
    teachers = teachers.filter(t=>t.id!==teacherId)
    res.send({msg:"deleted"})
}))

export default teacherRouter;
