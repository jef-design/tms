import express from 'express'
import dotenv from 'dotenv'
import uploadRoute from './routes/uploadRoute.js'
import customerRoute from './routes/customerRoute.js'
import cors from 'cors'
dotenv.config()

const PORT = process.env.PORT
const app = express()
app.use(cors({
     origin: ['http://localhost:5173','https://tms-eight88-beta.vercel.app','https://transflow.rgsoimcc.xyz'],
     credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res ) => {
    res.send("Hello")
})

app.use('/api/upload', uploadRoute)
app.use('/api/customer', customerRoute)

app.listen(PORT, () => {
    console.log(`connected to server on PORT ${PORT}`)
})