import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const PORT = 5000
const app = express()

app.get('/', (req, res ) => {
    res.send("Hello")
})

app.listen(PORT, () => {
    console.log(`connected to server on PORT ${PORT}`)
})