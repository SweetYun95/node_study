const a = true

// dynamic import: 특정 조건일때 require
// commonJS 모듈일때 문제없이 사용가능

if (a) {
   require('./func.js')
}

console.log('성공')
