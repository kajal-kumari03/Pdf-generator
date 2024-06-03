import { connect } from 'mongoose';

const connectToDB = async(uri) =>{
    try{
    await connect(uri);

    } catch(err){
      console.log(err);
    }
}

export default connectToDB;