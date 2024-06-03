import express from 'express'
import { config } from 'dotenv'
import connectToDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
 import bookrouter from './routes/bookRoutes.js';
config();
const port = process.env.PORT || 8000;
const dburl=process.env.DB_URL || null;

const app= express()

app.use(express.json());  
app.use("/user", userRouter);
app.use("/book" ,  bookrouter);

app.get('/', (req, res) => {
   res.send('Hello World!')
 }) 

 
app.listen(port,async ()=>{

 try {
   await connectToDB(dburl)
   console.log(`server is running on  ${port} `);
 } catch (error) {
   console.log(console.error());
   console.log("check your connection");
 }
 
})