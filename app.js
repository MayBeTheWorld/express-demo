import express from 'express'
import mountMiddleware from './middleware/index.js'
import mountRouters from './routes/index.js'

const PORT = 3000 //端口号
const app = express() //创建应用程序实例

mountMiddleware(app)
mountRouters(app)

// 启动Express应用程序，监听指定端口
app.listen(PORT, () => {
    // 在控制台输出服务器运行信息
    console.log(`Server is running at http://localhost:${PORT}`)
})