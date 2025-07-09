const Sequelize = require('sequelize')
const dotenv = require(`dotenv`)

const Customer = require(`./customer`)
const Order = require(`./order`)

// .env에서 현재 실행환경(development, test, production 중 하나)가져옴
const env = process.env.NODE_ENV || `development`

// 가져온 실행환경에 맞는 db 설정을 가져옴
const config = require(`../config/config.json`)[env]
const db = {}
dotenv.config()

// sequelize를 사용해서 db 연결 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// db 객체를 생성하여 sequelize 객체와 모든 모델들을 저장
db.sequelize = sequelize

// User, Comment 모델을 db 객체에 추가
db.Customer = Customer
db.Order = Order

// 모델 초기화후 db 연결
Customer.init(sequelize)
Order.init(sequelize)

// 모델 간 관계설정
Customer.associate(db)
Order.associate(db)

// db 객체를 내보냄
module.exports = db