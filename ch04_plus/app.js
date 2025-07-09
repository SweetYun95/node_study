const express = require('express')
const path = require(`path`)
const morgan = require(`morgan`)
const { sequelize } = require(`./models`)

require(`dotenv`).config

// 라우터 불러오기
const indexRouter = require(`./routes`)
const customersRouter = require(`./routes/customers`)
const ordersRouter = require(`./routes/orders`)

const app = express()
app.set(`post`, process.env.PORT || 3000)

// db 연결해
sequelize
   .sync({ force: false })
   .then(() => {
      console.log(`db 연결됨`)
   })
   .catch((err) => {
      console.error(`!!db 안됨!! : ${err}`)
   })

// 공통 미들웨워임
app.use(morgan(`dev`))
app.use(express.static(path.join(__dirname, `public`)))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 라우터 연결임
app.use(`/`, indexRouter)
app.use(`/customers`, customersRouter)
app.use(`/orders`, ordersRouter)

// 에러처리 미들워어
// 경로 오류 에러
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} no router`)
   error.status = 404
   next(error)
})
// 경로 오류 외 에러
app.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || `서버에러`

   res.status(status).send(`
      <h1> Error ${status}</h1>
      <p>${message}</p>
        `)
})

app.listen(app.get(`post`), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
