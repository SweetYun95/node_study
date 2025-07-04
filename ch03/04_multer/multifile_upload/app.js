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
   console.log(`uploads 폴더 있음`)
} catch (error) {
   // 폴더가 없으면 에러 발생
   console.log(`uploads 폴더 없음, 폴더를 생성합니다.`)
   fs.mkdirSync(`uploads`) // uploads 폴더생성
}

const upload = multer({
   storage: multer.diskStorage({
      // 업로드 파일 저장 경로 설정
      destination(req, file, done) {
         done(null, 'uploads/') // uploads 폴더에 저장
      },
      // 저장할 파일 이름 설정
      filename(req, file, done) {
         // file.originalname = dog.png
         // ext = .png
         const ext = path.extname(file.originalname) // 파일 확장자 추출
         // path.basename(file.originalname, ext) = dog
         // Date.now(): 현재의 시분초 단위로 날짜데이터 생성(중복X) = 1751595497468
         // 파일명 : dog1751595497468.png
         done(null, path.basename(file.originalname, ext) + Date.now() + ext) // 어떤 파일명으로 저장할지 지정
      },
   }),
   limits: { fieldSize: 5 * 1024 * 1024 }, // 업로드 파일 크기 제한(5MB)
})

// http://localhost:8000/upload 에서 보여주는 화면
app.get('/upload', (req, res) => {
   res.sendFile(path.join(__dirname, 'multipart.html'))
})

// name = 'many' 인 파일 하나만 upload
app.post('/upload', upload.array(`many`), (req, res) => {
   console.log(req.files) // 업로드된 파일들(multiple) 정보 출력
   res.send(`파일 업로드 완료`)
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
