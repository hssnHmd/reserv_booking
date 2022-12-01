import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import hotelRouter from './routes/hotel.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/users.js'
import roomRouter from './routes/rooms.js'
import cookieParser from 'cookie-parser'



const app = express();
dotenv.config()

app.use(cookieParser())
app.use(express.json())

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGODB) 
        console.log('connected to mdb')
    } catch (error) {
        throw error
    }
}



app.use('/api/hotel', hotelRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/room', roomRouter)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMsg = err.message || "somethings wrong"
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMsg,
        stack:err.stack
    })
})
app.listen(8080, () => {
    connect()
    console.log('connected')
})