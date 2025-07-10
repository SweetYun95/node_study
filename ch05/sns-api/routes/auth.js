const express = require('express')
const bcrypt = require(`bcrypt`)
const router = express.Router()
const User = require(`../models/user`)

// 회원가입 localhost:8000/auth
router.post(`/join`, async (req, res, next) => {
   try {
      const { email, nick, password } = req.body

      // 이메일로 기존 사용자 검색
      // selsct * from users where email = ? LIMIT = 1
      const exUser = await User.findOne({
         where: { email },
      })
      // 이미 User가 존재할 경우
      if (exUser) {
         return res.status(409).json({
            success: false,
            message: `이미 존재하는 사용자 입니다.`,
         })
      }

      // 중복X -> 계정 생성
      // 비밀번호 암호화
      const hash = await bcrypt.hash(password, 12) // 12: salt(해시 암호화를 진행시 추가되는 임의의 데이터 주로 10~12 가 권장값)

      // 뉴페이스 생성
      const newUser = await User.create({
         email,
         nink,
         password: hash,
      })

      // 성공 응답 반환
      console.log(newUser)
      res.status(201).json({
         success: true,
         message: `사용자가 성공적으로 등록되었다`,
         // insert 한 데이터 일부 전달
         user: {
            id: newUser.id,
            email: newUser.email,
            nick: newUser.nick,
         },
      })
   } catch (error) {      
    // 에러발생시 미들웨어로 전달
      error.message = `회원가입 중 오류가 발생했습니다.`
      next(error)
   }
})

module.exports = router
