import jwt from 'jsonwebtoken'
import blackListModel from '../models/blacklistModel.js';



export const generateToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_SECRET , {expiresIn : '8h'})
}


export const blackListToken = async (token) =>{
    const blackList = new blackListModel({token});
    await blackList.save()
}



export const isTokenBlackListed = async (token) =>{
    const blackList = await blackListModel.findOne({token})
    return blackList ? true : false
}