const passport = require('passport')
const local = require('./localStrategy')
const User = require('../models/user')

// passport에 로그인 인증과정, 직렬화, 역질렬화를 등록해둔다

module.exports = () => {
   // 직렬화 (serializeUser) : 로그인 성공후 사용자 정보를 세션에 저장
   passport.serializeUser((user, done) => {
      console.log(`👦user: ${user}`) // 사용자 정보가 저장되어 있는 객체
      done(null, user.id) // user 테이블의 id(=PK) 값
   })

   // 역직렬화 (deserializeUser) : 클라이언트에게 request가 올때 마다 세션에 저장된 사용자 id(user 테이블의 PK 값(=id 컬럼))를 바탕으로 사용자 정보 조회
   passport.deserializeUser((id, done) => {
      // id는 직렬화에서 저장한 user.id
      // response 해주고 싶은 사용자 정보를 가져온다
      // select `id`, `nick`, `email`, `createdAt`, `updatedAt` from users where id =? limit `
      User.findOne({
         where: { id },
         attributes: [`id`, `nick`, `email`, `createdAt`, `updatedAt`],
      })
         .then((user) => done(null, user)) // 성공시 가져온 사용자 객체 정보를 반환
         .catch((err) => done(err)) // 에러발생시 에러반환
   })

   local() // localStrategy.js 에서 export된 함수를 Passport에 추가
}
