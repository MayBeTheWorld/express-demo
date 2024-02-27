// routes/response.js
import express from 'express';
import path from 'path'

const router = express.Router();

//发送json数据
router.get('/response/json', (req, res) => {
    res.json({
        name: 'express',
        type: 'framework'
    })
})

//发送任意类型数据
router.get('/response/send', (req, res) => {
    // html
    res.send('<h1>hello express</h1>')
})

//用于下载文件。
router.get('/response/download', (req, res) => {
    // 指定文件路径
    // res.download('package.json')
    res.download(path.resolve('./package.json'))  
})

export default router