import express from 'express';

const router = express.Router();

router.get('/response/get/header', (req, res) => {
    res.json(req.headers)
})

router.get('/response/set/header', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.set('token', '12345678')
    res.send('<h1>hello express</h1>')
})

export default router