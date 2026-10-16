import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`, {
    dbName: DB_NAME,
    });
    console.log(`\n mongodb connected !! DB Host : ${connectionInstance.connection.host}`)
  } catch (error) {
    console.error("error while connecting to DB :" + error)  
   process.exit(1) 
  }
}

export default connectDB