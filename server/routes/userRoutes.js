import express from 'express';

const router = express.Router();

// Example route
router.get('/test', (req, res) => {
    res.send('User routes working!');
});

export default router;
