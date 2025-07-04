const express = require('express')
const router = express.Router() // 라우터(경로를 지정해준다)를 가져온다



// router.get(
//    '/',    (req, res, next) = {
    
//     next('route')
// },

//    (req, res, next) => {
//       console.log(`실행되지 안씁니다.`)
//       next()
//    },
//    (req, res, next) => {
//       console.log(`실행되지 안씁니다.`)
//       next()
//    }
// )

// localhost:8000/
router.get('/', (req, res) => {
   res.send(`Hello, Exxx`)
})

// localhost:8000/test
router.get('/test', (req, res) => {
   res.send(`Hello, Exxx test`)
})

// localhost:8000/?/
router.get('/:id', (req, res) => {
   res.send(`GET/${req.params.id}`)
})

// localhost:8000/?/test
router.get('/:id/test', (req, res) => {
   res.send(`GET /${req.params.id}/test`)
})

module.exports = router // 라우터를 내보냄
