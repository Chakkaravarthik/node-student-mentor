import express from 'express';
import { userModel } from '../../db-utils/model.js';
import bcrypt from 'bcrypt'

const registerrouter = express.Router();

registerrouter.post('/', async (req, res) => {
    const userdata = req.body;

    bcrypt.hash(userdata.password, 10, async (err, hash)=> {
        if (err){
            res.status(404).send({msg :'check password'});
        }else{
            // Check if the user already exists
        const userobj = await userModel.findOne({ email: userdata.email });

        if (userobj) {
            return res.status(400).send({ msg: 'User already exists' });
        } else {
            // Create a new user object
            const newuser = new userModel({
                ...userdata,password:hash,
                id: Date.now().toString()
            });

            // Save the new user to the database
            await newuser.save();

            // Send success response
            return res.status(201).send({ msg: 'User registered successfully' });
        }
        }
    });
        
     
});

export default registerrouter;
