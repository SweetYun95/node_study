const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

// 쿠키 파서 설정(보안 강화를 위해 서명(자유롭게 지정 가능) 추가)
app.use(cookieParser('my-secret-key'))

//쿠키만들기
app.get('/set-cookie', (req, res) => {
   // res.cookie(키, 값)

   // signed: false -> 암호화 진행 X ,maxAge -> 쿠키 저장 시간 : 1시간
   // 1초 : 1000
   // 1시간 : 1000 * 60 * 60
   res.cookie('age', '25', { signed: false, maxAge: 1000 * 60 * 60 })

   // signed: true -> 서명된 암호화 진행
   res.cookie('user', 'Alice', { signed: true, maxAge: 1000 * 60 * 60 })
   res.send(`서명된 쿠키가 설정됨`)
})

// 쿠키 일기
app.get('/get-cookie', (req, res) => {
    console.log('cookies: ', req.cookies) // 일반 쿠키(서명되지 않은 쿠키) 
    console.log('signed cookies: ', req.signedCookies) // 암호화된 쿠키(서명된 쿠키)

    res.send(`쿠키: ${req.cookies.age}, 서명된 쿠키: ${req.signedCookies.user}`)
})
 
// 쿠키 삭제
app.get('/clear-cookie', (req, res) => {
    // res.clearCookie(키값)
res.clearCookie('age')
    res.clearCookie('user')
    res.send(`쿠키가 삭제되었습니다.`)
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
