const express = require('express')
const User = require(`../models/user`)
const router = express.Router()

router.get('/', async (req, res, next) => {
   // select * from users
   try {
      const users = await User.findAll()
      console.log(`users: ${users}`)

      // 200:  성공, json 객체 형태로 response
      res.status(200).json(users)
   } catch (error) {
      console.error(error)
      next(error) // 에러처리 미들웨어로 이동
   }
})

//http://localhost:8000/users/:id
router.get('/:id', async (req, res, next) => {
   try {
      const user = await User.findAll({
         where: { id: req.params.idd },
      })
      console.log(`users: ${user}`)
      res.status(200).json(users)
   } catch (error) {
      console.error(error)
      next(error) // 에러처리 미들웨어로 이동
   }
})

module.exports = router
