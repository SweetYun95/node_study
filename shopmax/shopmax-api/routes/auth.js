const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()

// 회원가입
router.post(`/join`, async (req, res, next) => {
   try {
      const { email, name, address, password } = req.body

      // 이메일로 기존 사용자 검색
      // select * from users where email = ? LIMIT 1;
      const exUser = await User.findOne({
         where: { email },
      })

      // 이미 사용자가 존재할 경우 409 상태코드와 메세지를 json 객체로 전달
      if (exUser) {
         const error = new Error('이미 존재하는 사용자입니다.')
         error.status = 409 // Conflict
         return next(error) // 에러 미들웨어로 이동
      }

      // 이메일 중복 확인을 통과시 새로운 사용자 계정 생성
      // 비밀번호 암호화
      const hash = await bcrypt.hash(password, 12)
      // 새로운 사용자 생성(키값은 DB 컬럼명과 같게)
      const newUser = await User.create({
         email,
         name,
         password: hash,
         role: 'USER',
         address,
      })

      res.status(201).json({
         succeess: true,
         message: '회원가입 성공',
         user: {
            id: newUser.id,
            name: newUser.name,
            role: newUser.role,
         },
      })
   } catch (error) {
      error.status = 500
      error.message = '회원가입 중 오류가 발생했습니다.'
      next(error)
   }
})

// ✅ 로그인
router.post('/login', (req, res, next) => {
   passport.authenticate('local', (err, user, info) => {
      if (err) return next(err)
      if (!user) {
         return res.status(401).json({ message: info.message || '로그인 실패' })
      }

      // 세션에 로그인 정보 저장
      req.login(user, (loginErr) => {
         if (loginErr) return next(loginErr)
         return res.status(200).json({
            message: '로그인 성공',
            user: {
               id: user.id,
               name: user.name,
               email: user.email,
            },
         })
      })
   })(req, res, next)
})

// ✅ 로그아웃
router.get('/logout', (req, res) => {
   req.logout(() => {
      res.clearCookie('connect.sid')
      res.status(200).json({ message: '로그아웃 완료' })
   })
})

// ✅ 로그인 상태 확인
router.get('/status', (req, res) => {
   if (req.isAuthenticated()) {
      return res.status(200).json({
         loggedIn: true,
         user: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
         },
      })
   } else {
      return res.status(200).json({ loggedIn: false })
   }
})

module.exports = router
