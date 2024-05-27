import express from 'express';

const studentsRouter = express.Router();

// STUENTS array server craetion 

//-----

let students = [
    {
        id:"1",
        name:"sugar",
        age:'10',
        gender:"male",
        teacherid:null
    }
];

//get students data

studentsRouter.get('/',((req,res)=>{
    res.send(students)
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

export default studentsRouter;
