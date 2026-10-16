import 'dotenv/config' 
import connectDB from "./db/index.js";
import { app } from './app.js';



connectDB()
.then(() => {
  app.listen(process.env.PORT || 3005, () => {
    console.log(`app is listening on http://localhost:${process.env.PORT}`)
  })
})
.catch((err) => {
  console.error("mongo db connection failed!!:", err)
})
