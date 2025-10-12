import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js';
import userRouter from './routes/userRoute.js';


const app = express();
const PORT = process.env.PORT || 4000;
await connectDB()
/* middleware config */
app.use(express.json());
app.use(cookieParser());
app.use(cors({}))
app.use('/api/user',userRouter)
app.get('/', (req,res) => {
    res.send("api is working") 
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})