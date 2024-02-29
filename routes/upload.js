import express from 'express'
import multer from 'multer'
// 引入nodejs文件系统模块
import fs from 'fs'

const router = express.Router()

// 指定文件存储位置和文件名
const storage = multer.diskStorage({
    destination(req, file, cb) { // destination函数指定了文件存储目录
        const dir = './uploads' // './uploads'为指定的文件存储目录
        if (!fs.existsSync(dir)) { // 如果该目录不存在，则创建目录
            fs.mkdirSync(dir, { recursive: true })
        }
        cb (null, './uploads') // 将文件存储到指定目录
    },
    filename(req, file, cb) { // filename函数指定了文件命名规则
        const ext = file.originalname.split('.').pop() // 获得文件名后缀
        cb(null, `${Date.now()}-${file.fieldname}.${ext}`) // 将文件存储到指定位置，并以指定的文件命名
    }
})

// 创建multer实例并配置相关选项
const upload = multer({
    storage, // 存储位置和文件名规则
    limits: {
        fileSize: 1024 * 1024 * 5 // 限制文件大小为5MB
    },
    fileFilter(req, file, cb) { // fileFilter函数指定了文件类型过滤规则
        // 拒绝上传非图片类型的文件
        if (!file.mimetype.startsWith('image/')) {
            const err = new Error('Only image files are allowed!') // 具体错误信息
            err.status = 400 // 设置错误代码为400
            return cb(err, false)
        }
        return cb(null, true)
    }
})

// 处理文件上传请求
router.post('/upload/image', upload.single('file'), (req, res) => {
    // 这里的upload.single函数指定了只上传单个文件
    res.json({
        message: '文件上传成功',
        data: req.file // 返回上传成功的信息和上传的文件信息
    })
})

export default router // 导出路由模块
