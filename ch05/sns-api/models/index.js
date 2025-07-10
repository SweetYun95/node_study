const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]

const Hashtag = require(`./hashtag`)
const Post = require(`./post`)
const User = require(`./user`)

const db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize

db.Hashtag = Hashtag
db.Post = Post
db.User = User

Hashtag.init(sequelize)
Post.init(sequelize)
User.init(sequelize)

Hashtag.associate(db)
Post.associate(db)
User.associate(db)

module.exports = db