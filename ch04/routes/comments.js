const express = require('express')
const Comment = require(`../models/comment`)
const router = express.Router()

// 새로운 댓글 등록
//localhost:8000/comments
router.post(`/`, async (req, res, next) => {
   try {
      const comment = await Comment.create({
         commenter: req.body.commenter,
         comment: req.body.comment,
      })
      console.log(comment)
      res.status(201).json(comment)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

// 댓글 수정
//localhost:8000/comments/:id
router.patch('/:id', async (req, res, next) => {
   try {
      // update comments set comment = '수정할 댓글 내용' where id =:id
      const result = await Comment.update(
         {
            comment: req.body.comment, // 수정할 댓글 내용
         },
         {
            where: { id: req.params.id },
         }
      )
      console.log(result)
      //result[0] 수정된 레코드의 갯수
      if (result[0] === 0) {
         // 수정이 안된 경우
         return res.status(404).json({ message: `댓글을 찾을 수 없습니다.` })
      }
      // 댓글이 정상적으로 수정된 경우
      res.status(200).json({ message: `댓글이 수정되었습니다. ${result}` })
   } catch (error) {
      console.error(error)
      next(error)
   }
})

// 댓글 삭제
router.delete('/:id', async (req, res, next) => {
   try {
      // delete fromm comments where id =:id
      const result = await Comment.destroy({
         where: { id: req.params.id },
      })
      console.log(result)
      //result: 삭제된 레코드의 갯수
      if (result === 0) {
         // 삭제된 데이터가 없는 경우
         return res.status(404).json({ message: `댓글을 찾을 수 없습니다.` })
      }
      // 댓글이 정상적으로 수정된 경우
      res.status(200).json({ message: `댓글이 삭제되었습니다. ${result}` })
   } catch (error) {
      console.error(error)
      next(error)
   }
})

module.exports = router
