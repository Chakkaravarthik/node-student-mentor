import express from 'express';
import { userModel } from '../../db-utils/model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


const loginrouter = express.Router();

loginrouter.post('/', async (req, res) => {
    const userdata = req.body;// email,pass

    const userobj = await userModel.findOne({ email: userdata.email });

        if (userobj) {
           //logic to handle login
           bcrypt.compare(userdata.password, userobj.password, async function(err, result) {
            // result == true

            const user = await userModel.findOne({email: userdata.email},{password:0,_id:0,__v:0})

            const userobject = user.toObject();

            //jwt token
            var token = jwt.sign(userobject, process.env.JWT_SECRET);
           
            if(err){
                res.status(500).send({msg:'something went wrong'})
            }else{
                if(result){
                    res.status(200).send({msg:'user athenticated success', code:1, token});
                }else{
                    res.status(404).send({msg:'user credentials wrong', code:0})
                }
            }
        });
        } else {
           res.status(404).send({msg:'user not found',code:2})
        }
     
});

export default loginrouter;
