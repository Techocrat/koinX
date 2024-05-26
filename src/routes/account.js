import express from 'express';
import Trade from '../models/Trade.js';

const router = express.Router();

router.post('/balance', async (req, res) => {
    const { timestamp } = req.body;

    if (!timestamp) {
        return res.status(400).json({ message: 'Timestamp is required' });
    }

    try {
        const date = new Date(timestamp);

        const trades = await Trade.find({ utcTime: { $lte: date } });

        const balances = trades.reduce((acc, trade) => {
            const { baseCoin, operation, amount } = trade;

            if (!acc[baseCoin]) {
                acc[baseCoin] = 0;
            }

            if (operation === 'Buy') {
                acc[baseCoin] += amount;
            } else if (operation === 'Sell') {
                acc[baseCoin] -= amount;
            }

            return acc;
        }, {});

        res.status(200).json(balances);
    } catch (error) {
        res.status(500).json({ message: 'Error calculating balance', error });
    }
});

export default router
