const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))

// 라우팅: 경로를 지정
const indexRouter = require('./routes/index') // index.js
const userRouter = require('./routes/user') // user.js

app.use('/', indexRouter) // localhost:8000/
app.use('/user', userRouter) // localhost:8000/user

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
