const express = require('express')
const session = require('express-session')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

// 세션 설정
app.use(
   session({
      name: 'my-session-cookie', // 세션 id를 저장하는 쿠키의 이름(자유롭게 지정가능)
      secret: 'your-secret-key', // 세션을 암호화 하는 키(자유롭게 지정가능)
       resave: false, // 세션 데이터가 바뀌지 않아도 저장소(백엔드 서버 RAM메모리)에 다시 저장할지 여부
      // 초기화 되지 않는 세션이란? req.session 으로 세션객체는 생성됬지만 그안에 어떤 정보도 들어가 있지 않은 상태
      saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
      cookie: {
         maxAge: 1000 * 60 * 60, // 세션id를 저장하는 쿠키의 저장시간(1시간)
         secure: false, // https를 사용할때만 쿠키 전송여부
      },
   })
)

//세션 값 저장
app.get('/set-session', (req, res) => {
   // 세션 객체 자체는 서버에 저장된다
   // 세션 객체가 생성될때 같이 생성되는 세션 id는 cookie에 저장되어 response 된다
   req.session.username = 'SweetYun' // 세션 객체도 key와 value로 구성
   req.session.role = 'admin'
   res.send(`세션 데이터 저장`)
})

//세션 값 확인
app.get('/get-session', (req, res) => {
    console.log(req.session)
    const { username, role } = req.session
    if (username && role) {
        res.send(`username: ${username}, role: ${role}, 세션 id: ${req.sessionID}`)

    } else {
        res.send(`세션 찾을 수 없음`)
    }
})

//세션 값 삭제
app.get('/destroy-session', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send(`세션 삭제 실패: ${err.message}`)
        } else {
            res.send(`세션 삭제!`)
            console.log(req.session)
        }
    })
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
