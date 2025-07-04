const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev')) // 로그 미들웨어
app.use('/', express.static(path.join(__dirname, 'public'))) // 정적파일 접근 미들웨어
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // 클라이언트에서 주는 데이터를 json 객체로 받기 위해 사용하는 미들웨어

// 업로드 폴더 확인 및 생성
try {
   fs.readdirSync('uploads') // uploads 폴더가 있는지 확인
} catch (error) {
   // 폴더가 없으면 에러 발생
   console.log(`uploads 폴더 없음, 폴더를 생성합니다.`)
   fs.mkdirSync(`uploads`) // uploads 폴더생성
}

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
