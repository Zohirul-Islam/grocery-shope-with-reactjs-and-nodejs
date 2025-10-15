import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';


const app = express();
const PORT = process.env.PORT || 4000;
await connectDB();
await connectCloudinary()
/* middleware config */
app.use(express.json());
app.use(cookieParser());
app.use(cors({}))
app.use('/api/user', userRouter);
app.use('/api/seller',sellerRouter)
app.get('/', (req,res) => {
    res.send("api is working") 
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})