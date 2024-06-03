


import {Router} from 'express'
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import { blackListToken, generateToken } from '../config/auth.js';
import { authmiddleware, rolemiddleware } from '../middleware/authMiddle.js';

const userRouter= Router();

userRouter.post('/register', async (req, res) =>{
    const {userName,email,password,role} = req.body;

    try {
       
        const userExist  = await User.findOne({email : email})
        if(userExist){
            return res.status(400).json({message : "user already exist"})
        }
        const hashedPassword = await bcrypt.hash(password , 10);
        const user = new User({userName,email,password : hashedPassword , role })
         await user.save();
         return res.status(201).json({message :"user registered sucessfully"})

    } catch (error) {
        console.log("Error while registering user :" , error.message );
        res.status(500).json({message : "Error while registering new user " + error.message})
    }
})


userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return re.status(400).json({ message: "user not found , please register the email" })
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "password is incorrect , please try correct password" })
        }
        const payload = { email: user.email, id: user._id, role: user.role }
        const token = generateToken(payload)
        res.status(200).json({token : token})

    } catch (error) {
        console.log("login error");
        res.status(500).send(error.message)
    }
})

//logout

userRouter.get("/logout" , authmiddleware , async (req, res) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        blackListToken(token);
        res.status(201).json({message : "logout sucessful"})
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

//get all users (admin only)
userRouter.get("/" , authmiddleware, rolemiddleware(['admin']), async(req, res) =>{
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.error('error while get all users requests:', error);
        res.status(500).send("error :" + err.message )
    }
})


export default userRouter;
