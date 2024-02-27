import express from "express";
import mountMethodDemo from './routes/method.js'
import routerDemo from './routes/router-demo.js'
import responseRouter from './routes/response.js'
import headerRouter from './routes/header.js'

const PORT = 3000 //端口号
const app = express() //创建应用程序实例
//引入支持Json解析的中间件
app.use(express.json());

//创建一个中间件
app.use((req, res, next) => {
    const { method, path, query, body, headers } = req
    console.log(`[${method}] ${path}`)
    console.log('query', query)
    console.log('headers', headers)
    console.log('body', body)
    next()
})

//注册路由
app.use(routerDemo)
// 将 routerDemo 路由注册到 /demo 路径下，路由会自动拼接上 /demo 前缀
app.use('/demo', routerDemo)
app.use(responseRouter)
app.use(headerRouter)


//创建一个GET /hello 路由
app.get('/hello', (req, res) => {
    res.send('<h1>Hello express</h1>');
})

// params 主要指路由中携带的 REST 参数
app.get('/hello/:id', (req, res) => {
    const { params } = req
    console.log('params', params)
    res.json(params)
})

//启动Express应用程序，监听指定端口
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/hello`)
})

//app.route() 可以用来创建链式路由，可以避免重复的路由名称。可以用于创建相同路由名称的不同请求方法，同时可以通过 all 设置所有请求的前置处理逻辑。
app.route('/route/any').all((req, res, next) => {
    console.log('pre all', req.method, req.path)
    next()
}).get((req, res) => {
    console.log('get request')
    res.send('get request')
}).post((req, res) => {
    console.log('post request')
    res.send('post request')
})
mountMethodDemo(app)