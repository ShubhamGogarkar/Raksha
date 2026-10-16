import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()
app.set('trust proxy', 1);
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true}))
app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({ extended: true,limit: "20kb"  }));
app.use(express.static("public"))
app.use(cookieParser())




import userRouter from './routes/user.route.js'
import healthcheckRouter from "./routes/healthcheck.route.js"

import { apiLimiter } from "./middlewares/rateLimiter.middleware.js";
app.use("/api", apiLimiter);


app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)


app.use((err, req, res, next) => {
     const statusCode = err.statusCode || 500;
     res.status(statusCode).json({
       success: false,
       message: err.message || "Internal Server Error",
       errors: err.errors || [],
     });
   });

export {app}