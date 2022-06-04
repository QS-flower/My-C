/**
 * 时间数据模型
 */
module.exports = class Log extends require('./model') {
    /**
     * 登录时间添加
     */
    static add(log) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `log` SET ?'
            this.query(sql, log).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`登录时间添加失败：${err.message}`)
                reject(err)
            })
        })
    }
}