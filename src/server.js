import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

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


app.listen(() => {
    console.log(`Listening on Port ${process.env.SERVER_PORT}`);
},)