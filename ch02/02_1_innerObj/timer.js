// const timeout = setTimeout(() => {
//     console.log(`1.5초 후 실행`)
// }, 1500)

// const interval = setInterval(() => {
//    console.log(`1초 마다 실행`)
// }, 1000)

// setTimeout(() => {
//    clearTimeout(timeout) // 7초뒤 setTimeout 중지
//    clearInterval(interval) // 7초뒤 setInterval 중지
// }, 7000);

setTimeout(() => {
    console.log(`setTimeout`)
}, 0)

// setTimeout(함수,0)보다 setImmediate이 먼저 실행되기는 하지만 항상 그런건 아니다.
const immediate = setImmediate(() => {
    console.log('즉시 실행')
})


const immediate2 = setImmediate(() => {
   console.log('실행되지 않습니다.')
})


clearImmediate(immediate2)







