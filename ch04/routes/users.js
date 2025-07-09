const express = require('express')
const User = require(`../models/user`)
const Comment = require('../models/comment')

const router = express.Router()

router.get('/:id', async (req, res, next) => {
   // select * from users
   try {
      const users = await User.findAll({
         where: { id: req.params.id },
         // attributes: [`name`, `age`],
      })
      console.log(`users: ${users}`)

      // 200:  성공, json 객체 형태로 response
      res.status(200).json(users)
   } catch (error) {
      console.error(error)
      next(error) // 에러처리 미들웨어로 이동
   }
})

// 특정 사용자가 작성한 댓글 가져오기
// localhost:8000/users//:id/comments
router.get(`/:id/comments`, async (req, res, next) => {
   try {
      // comments 테이블데이터를 가져올 때 users 테이블데이터를 포함해서 가져온다
      const comments = await Comment.findAll({
         include: {
            model: User,
            where: { id: req.params.id },
         },
      })
      console.log(comments)
      res.status(200).json(comments)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

// 특정 사용자 등록(insert)
router.post(`/`, async (req, res, next) => {
   try {
      console.log(req.body)

      const user = await User.create({
         name: req.body.name,
         age: req.body.age,
         married: req.body.married,
         comment: req.body.comment,
      })
      console.log(user)
      res.status(201).json(user)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

module.exports = router
