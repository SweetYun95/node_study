const express = require('express')
const passport = require(`passport`)
const bcrypt = require(`bcrypt`)
const router = express.Router()
const User = require(`../models/user`)

// 회원가입 localhost:8000/auth/join
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
         nick,
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

// 로그인 localhost:8000/auth/login
router.post(`/login`, async (req, res, next) => {
   // authenticate 함수는 localStrategy.js 에 작성한 인증 과정을 실행
   // -> 에러 발생시 authError 객체에 값을 주고, 인증과정 성공시 user에는 exUser값이 들어감
   passport.authenticate(`local`, (authError, user, info) => {
      if (authError) {
         // 로그인 인증 중 에러 발생!
         return res.status(500).json({
            success: false,
            message: `인증 중 오류 발생`,
            error: authError,
         })
      }

      if (!user) {
         // 비밀번호 불일치 || 사용자가 없을 경우 info.message를 사용해서 메시지 전달
         // 401: unauthhorized: 로그인 과정에서 인증 실패시 사용
         return res.status(401).json({
            success: false,
            message: info.message || `로그인 실패`,
         })
      }
      //인증이 정상적으로 된경우 사용자를 로그인 상태로 바꿈
      req.login(user, (loginError) => {
         if (loginError) {
            // 로그인 상태로 바꾸는 중 오류 발생시
            return res.status(500).json({
               success: false,
               message: `로그인 중 오류 발생`,
               error: loginError,
            })
         }

         // 로그인 성공시 user객체와 함께 response
         res.status(200).json({
            success: true,
            message: `로그인 성공`,
            user: {
               id: user.id,
               nick: user.nick,
            },
         })
      })
   })(req, res, next)
})

// 로그아웃 localhost:8000/auth/logout
router.get('/logout', async (req, res, next) => {
   req.logout((logoutError) => {
      if (logoutError) {
         // 로그아웃 상태로 바꾸는 중 에러 발생시
         return res.status(500).json({
            success: false,
            message: '로그아웃 중 오류 발생',
            error: logoutError,
         })
      }

      // 로그아웃 성공시 세션에 저장되어있던 사용자 id는 삭제된다
      // 로그아웃 성공시 response
      res.status(200).json({
         success: true,
         message: '로그아웃에 성공했습니다.',
      })
   })
})

// 현재 로그인 상태 확인 localhost:8000/auth/status
router.get(`/status`, async (req, res, next) => { 
   if (req.isAuthenticated()) {
      // 로그인 되었을 때
      // req.user는 passport의 역질렬화 설정에 의해 로그인 되었을 때 로그인 한 user 정보를 가져온다.
      res.status(200).json({
         isAuthenticated: true,
         user: {
            id: req.user.id,
            nick: req.user.nick
         },
      })
   } else {
      // 로그인이 안되었을 때
      res.status(200).json({ isAuthenticated: false,})
   }
})

module.exports = router
