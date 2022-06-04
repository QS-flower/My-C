/**
 * 文章数据模型
 */
module.exports = class Article extends require('./model') {
    /**
     * 获取收藏文章
     * num 条目数
     */
    static getHot(num) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time`,thumbnail FROM article WHERE hot = 1 LIMIT ?'
            this.query(sql, num).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取收藏文章失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 获取文章列表
     */
    static getList() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time` FROM article ORDER BY TIME DESC'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取文章列表失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 获取指定类目下的文章列表
     * id 类目编号
     */
    static getListByCategoryId(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time` FROM article WHERE category_id = ? ORDER BY TIME DESC'
            this.query(sql, id).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取指定类目下的文章列表失败：${err.message}`)
                reject(err)
            })
        })
    }


    /**
     * 获取指定关键词的文章列表
     * keyword 关键词
     */
    static getListBykeywrod(keyword) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time` FROM article WHERE title LIKE ? ORDER BY TIME DESC'
            this.query(sql, `%${keyword}%`).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取指定关键词的文章列表失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 获取指定文章的详情
     * id 文章编号
     */
    static getArticleById(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT a.id,a.title,a.content,a.`time`,a.hits,a.`category_id`,c.`name`,a.`thumbnail`,a.`hot` FROM article a,category c WHERE a.`category_id` = c.`id` AND a.id = ?'
            this.query(sql, id).then(results => {
                resolve(results[0])
            }).catch(err => {
                console.log(`获取指定文章的详情失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 上一篇文章
     * id 当前文章的编号
     */
    static getPrevArticle(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title FROM article WHERE id < ? ORDER BY id DESC LIMIT 1'
            this.query(sql, id).then(results => {
                resolve(results[0])
            }).catch(err => {
                console.log(`上一篇文章失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 下一篇文章
     * id 当前文章的编号
     */
    static getNextArticle(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title FROM article WHERE id > ? ORDER BY id ASC LIMIT 1'
            this.query(sql, id).then(results => {
                resolve(results[0])
            }).catch(err => {
                console.log(`下一篇文章失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 总文章数
     */
    static getCount(category_id, hot) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM article WHERE 1=1'

            sql += category_id != -1 && category_id ? ` AND category_id=${category_id}` : ''
            sql += hot != -1 && hot ? ` AND hot=${hot}` : ''

            this.query(sql).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获取总文章数失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 获取指定页文章列表
     * start 起始索引
     * size 查询条目数
     */
    static getPage(start, size, category_id, hot) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,`thumbnail`,hot FROM article WHERE 1=1'

            sql += category_id != -1 && category_id ? ` AND category_id=${category_id}` : ''
            sql += hot != -1 && hot ? ` AND hot=${hot}` : ''

            sql += ' ORDER BY `time` DESC LIMIT ?,?'
            this.query(sql, [start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取指定页文章列表失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 设置收藏
     * id 文章编号
     * hot 收藏状态
     */
    static setHot(id, hot) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE article SET hot = ? WHERE id = ?'
            this.query(sql, [hot, id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`设置收藏失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 添加文章
     * article 文章对象
     */
    static add(article) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO article SET ?'
            this.query(sql, article).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`添加文章失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 删除文章
     * id 文章编号
     */
    static del(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM article WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`删除文章失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 编辑文章
     * article 文章对象
     */
    static edit(article) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE article SET title = ?, content = ?, hot = ?, category_id = ?, thumbnail = ? WHERE id = ?'
            this.query(sql, [article.title, article.content, article.hot, article.category_id, article.thumbnail, article.id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`编辑文章失败：${err.message}`)
                reject(err)
            })
        })
    }
}