// 1. 모듈 사용법
// const checkNumber = require('./func') // checkOddOrEven() 함수

// console.log('checkNumber: ', checkNumber(10))
// console.log('checkNumber: ', checkNumber(11))

// 2. require는 함수고, 함수는 객체이므로 require는 객체 속성을 가지고 있다
console.log(require.main)

// 3. 순환참조 문제
// const insideDep1 = require('./dep1')
// const insideDep2 = require('./dep2')
// insideDep1()
// insideDep2()