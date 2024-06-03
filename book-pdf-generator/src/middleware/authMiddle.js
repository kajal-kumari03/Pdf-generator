
import jwt from 'jsonwebtoken';
import { isTokenBlackListed } from '../config/auth.js';



export const authmiddleware = async (req, res , next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isBlacklisted = await isTokenBlackListed(token);
        if(isBlacklisted){
            return res.status(401).json({message : "Token is blacklisted , please get new token"})
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        console.log("decoded : ", decoded );
        req.user = decoded;
        next();

    } catch (error) {
        console.log(error.message);   
        return res.status(401).json({message : "invalid or expired token"})     
    }
}

export const rolemiddleware = (roles = []) =>{
    return (req, res, next) =>{
        console.log("role middleware:" , req.user.role);

        if(!req.user || !req.user.role){
            return res.status(401).json({message : "user not authenticated"})
        }
        //have specific role
        const userHasRole = roles.some(role => req.user.role.includes(role))
        if(userHasRole){
            next()
        }
        else{
            return res.status(403).json({message :"You dont have acess to perform this action"})
        }
    }
}