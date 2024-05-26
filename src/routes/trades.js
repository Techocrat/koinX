import express from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';
import Trade from '../models/Trade.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;

    const trades = [];

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            const [baseCoin, quoteCoin] = row.Market.split('/');
            trades.push({
                userId: row.User_ID,
                utcTime: new Date(row.UTC_Time),
                operation: row.Operation,
                market: row.Market,
                baseCoin: baseCoin,
                quoteCoin: quoteCoin,
                amount: parseFloat(row['Buy/Sell Amount']),
                price: parseFloat(row.Price),
            });
        })
        .on('end', async () => {
            try {
                await Trade.insertMany(trades);
                res.status(200).json({ message: 'Trades successfully uploaded and stored in the database' });
            } catch (error) {
                res.status(500).json({ message: 'Error storing trades in the database', error });
            } finally {
                fs.unlinkSync(filePath);
            }
        });
});

export default router

