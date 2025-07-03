const express = require('express')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

// 전역 미들웨어: 모든 request에서 동작하는 미들 웨어
// 'request에서 - middleware - response' (중간)에서 동작
app.use((req, res, next) => {
   // rep: 요청에 대한 정보가 들어있는 객체
   // res: 응답에 대한 정보가 들어있는 객체
   console.log(`${req.method} , ${req.url}`)
   console.log(`미들웨어 1실행`)
   next() // 다음(response)으로 이동해주는 콜백함수로 이동 
})

app.use((req, res, next) => {
   console.log(`미들웨어 2실행`)
   next()
})

app.get('/', (req, res) => {
   // response
   console.log(`홈페이지`)
   res.send(`홈페이지`)
})

app.get('/about', (req, res) => {
   console.log(`소개 페이지`)
   res.send(`소개 페이지`)
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
