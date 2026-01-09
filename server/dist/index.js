import express from 'express';
import dotenv from 'dotenv';
import uploadRoute from './routes/uploadRoute.js';
import cors from 'cors';
dotenv.config();
const PORT = 5000;
const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.send("Hello");
});
app.use('/api/upload', uploadRoute);
app.listen(PORT, () => {
    console.log(`connected to server on PORT ${PORT}`);
});
