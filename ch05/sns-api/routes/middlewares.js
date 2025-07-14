// 로그인 상태 확인 미들웨어 : 사용자가 로그인 된 상태인지 확인
exports.isLoggedIn = (req, res, next) => {
   if (req.isAuthenticated()) {
      next() // 로그인이 됐으면 다음 미들웨어로 이동
   } else {
       // 로그인이 되지 않았을 때 에러미들웨어로 전송
      const error = new Error('로그인을 해주세요.')
      error.status = 403
      return next(error)
   }
}

// 비로그인 상태 확인 미들웨어 : 사용자가 로그인 안된 상태인지 확인
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
       // 로그인이 되지 않았을 경우 다음 미들웨어로 이동
      next()
    } else {
       // 로그인이 되었 때 에러미들웨어로 전송
       const error = new Error('이미 로그인 중입니다..')
       error.status = 400
       return next(error)
    }
}
