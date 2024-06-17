import express from 'express';
import { userModel } from '../../db-utils/model.js';
import bcrypt from 'bcrypt'
import { transport, mailOptions } from '../mail_utils.js';
import jwt from 'jsonwebtoken';

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
                id: Date.now().toString(),
                isVerified:false
            });

            // Save the new user to the database
            await newuser.save();


            //sign a token
            var token = jwt.sign(userdata, process.env.JWT_SECRET);

            await transport.sendMail({
                ...mailOptions,
                to: userdata.email,
                subject: `Verify Your Account `,
                text: `link the link to verify your account ${process.env.FE_URL}/verify-user?token=${token}`
            });

            // Send success response
            return res.status(201).send({ msg: 'User registered successfully' });
        }
        }
    });
        
     
});

export default registerrouter;
