import express from 'express'

export default function mountMiddleware(app) {
    //引入支持Json解析的中间件
    app.use(express.json()) // 支持body解析

    //创建一个中间件
    app.use((req, res, next) => {
        const { method, path, query, body, headers } = req
        console.log(`[${method}] ${path}`)
        console.log('query', query)
        console.log('headers', headers)
        console.log('body', body)
        next()
    })
}




