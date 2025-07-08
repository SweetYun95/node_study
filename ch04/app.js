const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { sequelize } = require('./models') // models/index.js
require('dotenv').config()

// 라우터 모듈 불러오기
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const commentsRouter = require('./routes/comments')
const { error } = require('console')

const app = express()
app.set('port', process.env.PORT || 3000)

// db 연결 설정
sequelize
   .sync({ force: false })// dbd에 이미 존재하는 테이블을 삭제하고 새로 생성할지 여부 -> 안함
   .then(() => {
      console.log(`db 연결 성공`)
   })
   .catch((err) => {
      console.error(`db 연결 실패${err}`)
   })

// 공통 미들웨어 설정
app.use(morgan('dev')) // 로그 기록
app.use(express.static(path.join(__dirname, 'public'))) // 정적 파일 제공
app.use(express.json()) // request 데이터를 json 객체로 받아옴
app.use(express.urlencoded({ extended: false }))

// 라우터 연결
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRouter)

// 에러처리 미들웨어

// 요청 경로에 해당하는 라우터가 없을때
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
   error.status = 404 // not found
   next(error)
})

// 경로 문제 외에 다른 모든 에러
app.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || '서버에러'

   // 에러 정보를 response
   res.status(status).send(`
        <h1> Error ${status}</h1>
        <p>${message}</p>
        `)
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
