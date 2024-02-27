import express from "express";

const router = express.Router();

router.get('/router/get', (req, res) => {
    res.send('GET router request');
})

router.post('/router/post', (req, res) => {
    res.send('POST router request');
})

export default router;