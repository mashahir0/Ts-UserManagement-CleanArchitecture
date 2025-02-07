import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from '../src/routes/authRoutes'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth',authRoutes)

mongoose.connect(process.env.MONGO_URI!)
.then(()=>console.log(`monogodb connected`))
.catch((err)=>console.log(`monogo connection err :${err}`))

app.listen(process.env.PORT,()=>console.log(`server connected : ${process.env.PORT}`))