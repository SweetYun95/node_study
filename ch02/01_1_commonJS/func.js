const { odd, even } = require('./ment') // require 함수안에 불러올 모듈의 경로 작성

// 홀짝 판단
function checkOddOrEven(num) {
   if (num % 2 === 0) {
      return even // '짝수입니다.'
   } else {
      return odd // '홀수입니다.'
   }
}

// 함수를 외부로 내보냄
module.exports = checkOddOrEven
