const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

// 4. body-parser 미들웨어: request data를 json 객체로 받아옴
app.use(express.json())
// form tag에서 입력한 데이터를 쿼리스트링 형태로 인코딩 해서 전송해줌 'name=승영&age=30'
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
   // response is html_page
   res.sendFile(path.join(__dirname, '/submit.html'))
})

// form tag의 method = 'post' 이므로 app.post()로 실행한다
app.post('/submit', (req, res) => {
    // request + response 할 때는 header + body 형태로 데이터가 전송된다
    // header : req, res 정보가 들어잇음
    // body : 데이터가 들어있음
   console.log(req.headers) // 
   console.log(req.body) // form tag에서 입력한 데이터 출력
   res.send(`데이터 수신 완료!`)
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
