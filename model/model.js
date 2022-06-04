const mysql = require('mysql')
//数据模型的基类
//封装了数据库操作
module.exports = class Model {
    // 连接对象
    //static conn = null

    /**
     * 数据库连接方法
     */
    static connection() {
        Model.conn = mysql.createConnection({
            host: '121.36.30.194',
            user: 'mysql',
            password: '123456',
            database: 'try'
        })
        Model.conn.connect(err => {
            if (err) {
                console.log(`数据库连接失败：${err.message}`)
            }
        })
    }

    /**
     * 关闭数据库连接
     */
    static end() {
        if (null != Model.conn) {
            Model.conn.end()
        }
    }

    /**
     * 通用查询方法
     * sql 要执行的SQL语句
     * params 给SQL语句的占位符进行赋值的参数数组
     */
    static query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection()

            Model.conn.query(sql,params,(err,results)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(results)
                }
            })

            this.end()
        })
    }
}