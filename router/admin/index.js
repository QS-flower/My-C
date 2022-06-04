/**
 * 后台首页
 */
const express = require('express')
const user = require('../../middleware/user')
const category = require('../../middleware/category')
const article = require('../../middleware/article')

const indexApp = express()

/**
 * 加载首页
 */
indexApp.get('/', [user.lastLoginTime, category.getCount, article.getCount], (req, res) => {
    let { user, lastLoginTime, articleCount, categoryCount } = req
    res.render('admin/index', { user: user, lastLoginTime: lastLoginTime,  articleCount: articleCount, categoryCount: categoryCount })
})
module.exports = indexApp