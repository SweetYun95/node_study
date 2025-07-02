import { odd, even } from './ment.mjs'

// 홀짝 판단
function checkOddOrEven(num) {
   if (num % 2 === 0) {
      return even // '짝수입니다.'
   } else {
      return odd // '홀수입니다.'
   }
}

// 함수를 외부로 내보냄
export default checkOddOrEven
