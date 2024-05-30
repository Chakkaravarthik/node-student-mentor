import express from 'express';
import {students , teachers } from './localVariables.js'

const studentsRouter = express.Router();

//get students data

studentsRouter.get('/',((req,res)=>{
    const {teacherId}=req.query;
    if(teacherId){
        res.send({students:students.filter(stu=>stu.teacherid===teacherId)})
    } else(
        res.send(students)
    )
    
}))

// create new students 

studentsRouter.post('/',((req,res)=>{
    const {body}=req;
    students.push({id:Date.now().toString(),teacherid:null,...body});
    res.send({msg:"created student sussefully"});
}))

// update students with styu id 

studentsRouter.put('/:studentId',((req,res)=>{
    const {studentId } = req.params;
    const {body} =req;
    const index = students.findIndex(stu=>stu.id===studentId);
    students[index]={ id:studentId,...body};
    res.send({msg:"students updated"})
}))

// delete a students 

studentsRouter.delete('/:studentsId',(req,res)=>{
    const {studentsId} = req.params;
    students = students.filter((stu) =>stu.id!==studentsId)
    res.send({msg:"student deleted"})
})


// assigna teacher id to a student
studentsRouter.patch('/assign-teacher/:studentId',((req,res)=>{
    const {body}=req;
    const {teacherId}=body;
    const {studentId} =req.params;
    const index = students.findIndex(s=>s.id===studentId);
    const tindex= teachers.findIndex(t=>t.id===teacherId);
    students[index].teacherId=teacherId;
    teachers[tindex].studentsId.push(teacherId,... teachers[tindex].studentsId);

    res.send({msg:'teacher assign susscessful'})
}))
export default studentsRouter;
