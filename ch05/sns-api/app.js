const express = require('express')
const path = require('path') // 경로 처리 유틸리티
const cookieParser = require('cookie-parser') // 쿠키 처리 미들웨어
const morgan = require('morgan') // HTTP 요청 로깅 미들웨어
const session = require('express-session') // 세션 관리 미들웨어
require('dotenv').config() // 환경 변수 관리

const app = express()
app.set('port', process.env.PORT || 8002)

// 시퀄라이즈를 사용한 DB연결

//미들웨어 설정
app.use(morgan(`dev`))
app.use(express.static(path.join(__dirname, `uploads`)))
app.use(express.json()) // JSON 데이터 파싱
app.use(express.urlencoded({ extended: false })) // URL-encoded 데이터 파싱
app.use(cookieParser(process.env.COOKIE_SECRET)) //쿠키 설정
//세션 설정
app.use(
   session({
      resave: false, //세션 데이터가 변경사항이 없어도 재저장 할지 여부 -> 변경사항이 있어야 재저장
      saveUninitialized: true, //초기화 되지 않은 세션 저장 여부 -> 초기화 되지 않은 빈 세션도 저장
      secret: process.env.COOKIE_SECRET, //세션 암호화 키
      cookie: {
         // maxAge를 설정하지 않으면 브라우저가 꺼지면 쿠키 삭제
         httpOnly: true, //javascript로 쿠키에 접근가능한지 여부 -> true 일경우 접근 X
         secure: false, //https를 사용할때만 쿠키 전송 여부 -> http, https 둘다 사용가능
      },
   })
)

// 잘못된 경로 처리
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`) //에러객체 생성
   error.status = 404 // 404 상태코드 설정
   next(error) //에러 미들웨어로 전달
})

// 에러 미들웨어
app.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || `서버에러`

   res.status(status).send(`<h1> Error ${status}</h1><p>${message}</p>`)
})

app.listen(app.get('port'), () => {
   console.log(`${app.get('port')}번 포트에서 대기중`)
})
