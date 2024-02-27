import headerRouter from './headers.js'
import responseRouter from './response.js'
import routerDemo from './router-demo.js'
import mountMethodDemo from './method.js'

const routers = [headerRouter, responseRouter, routerDemo, mountMethodDemo]

export default function mountRouters(app) {
    mountMethodDemo(app)

    // 注册所有router
    app.use(routers)

    // 将 routerDemo 路由注册到 /demo 路径下，路由会自动拼接上 /demo 前缀
    app.use('/demo', routerDemo)

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
}
