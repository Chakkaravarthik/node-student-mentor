import express from 'express';
import { userModel } from '../../db-utils/model.js';
import jwt from 'jsonwebtoken';

const verifyuserrouter = express.Router();

verifyuserrouter.post('/', async (req, res) => {
    const { token }=req.body;

    try{
        const data= jwt.verify(token, process.env.JWT_SECRET);
        await userModel.updateOne({email:data.email}, {$set:{isVerified:true} })
        res.send({msg:'user verified successful', code:1})
    }catch(e){
        console.log(e.message);
        res.status(403).send({msg: 'user verification failed', code:-1})
    }
});


export default verifyuserrouter;