import Sequelize from 'sequelize'

// 创建 Sequelize 实例
const sequelize = new Sequelize('node_test', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

// 定义users表对应模型
const User = sequelize.define(
    'User',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        age: {
            type: Sequelize.INTEGER(3),
            allowNull: false
        }
    },
    {
        tableName: 'users', // 指定表格名称
        timestamps: false
    }
)

// 创建 CRUD 操作方法
async function createUser(name, age) {
    const user = await User.create({ name, age })
    return user.toJSON()
}