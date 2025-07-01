const string = 'abc'
const number = 1
const boolean = true
const obj = {
   outside: {
      inside: {
         key: 'value',
      },
   },
}

// 콘솔에 테이블 형식으로 표시
console.table([
   { name: 'zero', birth: 1994 },
   { name: 'hero', birth: 1998 },
])

// 객체를 콘솔에 어떻게 표기 할지 설정
console.dir(obj, { colors: true, depth: 1 })
console.dir(obj, { colors: true, depth: 2 })

// 코드의 실행시간 측정
console.time('실행시간측정') //time() 과 timeEnd() 함수의 글자가 같아야한다.
for (let i = 0; i < 100000; i++) {}
console.timeEnd('실행시간측정')

// 에러위치 추적
function b() {
    console.trace('에러위치추적') // 어디서 에러가 발생했는제 추적하게 해줌
}

function a() {
   b()
}

a()