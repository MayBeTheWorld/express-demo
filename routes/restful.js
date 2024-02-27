import express from 'express'

const router = express.Router()

// 用于测试的数据
const userList = [
    {
        id: 1,
        name: '张三'
    },
    {
        id: 2,
        name: '李四'
    },
    {
        id: 3,
        name: '王五'
    }
]