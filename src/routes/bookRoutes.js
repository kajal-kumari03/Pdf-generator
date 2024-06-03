import { Router } from "express";
import { authmiddleware, rolemiddleware } from "../middleware/authMiddle.js";
import BookModel from "../models/BookModel.js";

const bookRoute= Router();

bookRoute.post("/create",authmiddleware, async(req, res)=>{
    const {title,author,frontCoverImage,backCoverImage, pages}= req.body;
    try {
        const newbook = new BookModel({title,author,frontCoverImage,backCoverImage, pages})
        await newbook.save();
        res.status(201).json({book:newbook})
    } catch (error) {
        console.log(error);
    }
})

// get all the book 
bookRoute.get("/", authmiddleware, async(req, res)=>{
    const page = parseInt(req.query.page) ||1;
    const limit= parseInt(req.query.page) || 10;
    try {
        const books=await BookModel.find()
        .skip((page-1)*limit)
        .limit(limit);
        res.status(200).json({books:books})
    } catch (error) {
        console.error("error while fetching the books",error);
        res.status(500).json({message:"erroe in fetcing the books "})
    }
})


bookRoute.get("/:id",authmiddleware, async(req, res)=>{
   const bookId= req.params.id;
   try {
     const book= await BookModel.findById(bookId);
     if(!book){
        return res.status(404).json({message:"book not found"})
     }
     res.status(200).json({message:book})
   } catch (error) {
    console.error("error while fetching the book by Id",error);
    res.status(500).json({message:"error in fetcing the book by Id "})
   }
})

// delete by id
bookRoute.delete("/:id",authmiddleware, rolemiddleware (['admin']) ,async(req, res)=>{
    const bookId= req.params.id;
    try {
        const deleteBook= await BookModel.findByIdAndDelete(bookId)
        if(!deleteBook){
            return res.status(404).json({message:"book not found"})
        }
        res.status(200).json({message:"deleted sucessfully"})
    } catch (error) {
        console.error("error while fetching the book by Id",error);
    res.status(500).json({message:"error in fetcing the book by Id "})
    }
})

export default bookRoute