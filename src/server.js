import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import tradeRoutes from './routes/trades.js'

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to Database');
}).catch((err) => {
    console.error('Error connecting to Database', err);
});



// Routes
app.use('/api/v1/trades', tradeRoutes);

const PORT = process.env.SERVER_PORT || 8080; 
app.listen(PORT, () => {
    console.log(`Listening on Port ${process.env.SERVER_PORT}`);
},)