import express from 'express';
import { userModel } from '../../db-utils/model.js';
import bcrypt from 'bcrypt'

const loginrouter = express.Router();

loginrouter.post('/', async (req, res) => {
    const userdata = req.body;// email,pass

    const userobj = await userModel.findOne({ email: userdata.email });

        if (userobj) {
           //logic to handle login
           bcrypt.compare(userdata.password, userobj.password, function(err, result) {
            // result == true
            if(err){
                res.status(500).send({msg:'something went wrong'})
            }else{
                if(result){
                    res.status(200).send({msg:'user athenticated success', code:1});
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
