import { Schema , model } from "mongoose";

const BookSchema = new Schema({
    title : {type : String , required : true},
    author : {type :String , required : true},
    frontCoverImage : String,
    backCoverImage : String,
    pages :[
        {
            content :String,
            backgroundImage : String
        }
    ],
    

},
{versionKey : false})

const BookModel = model("books" , BookSchema);
export default BookModel;