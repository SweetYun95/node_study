const a = true

//ES 모듈은 특정 조건절에서 사용 X
// if (a) {
//    import './func.mjs'
// }

if (a) {
   await import('./func.mjs')
}

console.log('성공')
