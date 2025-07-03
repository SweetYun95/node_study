const express = require('express')
require('dotenv').config() // env파일을 사용하기 위한 라이브러리 로드

const app = express()
app.set('port', 8000) // 포트번호

/*
post : 데이터를 생성해줘
get : 데이터를 가져와줘
put : (전체)데이터 수정해줘
patch : (일부)데이터 수정해줘
delete: 데이터 삭제해줘
*/

//  http://localhost:8000/ 로 request가 온 경우 실행
app.get('/', (req, res) => {
   // request가 들어오면 콜백 함수 부분의 코드 실행
   // rep:request, 요청에 대한 정보가 들어있음
   // res:response, 응답을 처리하는 객체
   // console.log('req: ',req)
   // console.log('res: ',res)
   res.send(`안녕! node express!`) // 클라이언트에게 응답을 보낸다
})

//  http://localhost:8000/test 로 request가 온 경우 실행
app.get('/test', (req, res) => {
   res.send(`안녕! test!`)
})

// 서버를 동작시킴
app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
