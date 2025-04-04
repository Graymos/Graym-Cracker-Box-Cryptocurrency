/* Express server setup for Graym Cracker Box - Handles API endpoints and blockchain interactions */
/* Note: Used AI assistance for the API endpoint structure and error handling*/
import express from 'express';
import cors from 'cors';
import objHippoChain from './index.js';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

/* AI-assisted API endpoint implementation */
// Get the entire blockchain
app.get('/api/chain', async (req, res) => {
    try {
        const chain = await objHippoChain.loadChain();
        res.json(chain);
    } catch (error) {
        console.error('Error getting chain:', error);
        res.status(500).json({ error: 'Failed to retrieve blockchain' });
    }
});

// Mine a new block
app.post('/api/mine', async (req, res) => {
    const { amount, sender, recipient } = req.body;

    if (!amount || !sender || !recipient) {
        return res.status(400).json({ 
            error: 'Missing required fields',
            details: {
                amount: !amount ? 'Amount is required' : null,
                sender: !sender ? 'Sender is required' : null,
                recipient: !recipient ? 'Recipient is required' : null
            }
        });
    }

    try {
        const newBlock = await objHippoChain.createNewBlock(
            Number(amount),
            sender.toString(),
            recipient.toString()
        );
        console.log('New block mined successfully:', newBlock);
        res.json(newBlock);
    } catch (error) {
        console.error('Error mining block:', error);
        res.status(500).json({ 
            error: error.message || 'Failed to mine new block',
            details: error.stack
        });
    }
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: err.message
    });
});


app.listen(port, () => {
    console.log(`Blockchain server running at http://localhost:${port}`);
}); 