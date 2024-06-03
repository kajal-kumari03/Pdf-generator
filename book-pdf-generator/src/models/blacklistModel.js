import {Schema, model} from 'mongoose'

const blackListSchema = new Schema({
    token : {type :String , required : true},
    createdAt : {type :String , default : Date.now , expires : '8h' }
})


const blackListModel = model("blacklist" , blackListSchema);

export default blackListModel