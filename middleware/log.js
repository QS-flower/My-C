//时间中间件
const Log = require('../model/log')
module.exports = {
    /**
     * 添加登录时间
     */
    add: (req, res, next) => {
        Log.add(req.log).then(results => {
            req.count = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}