const os = require('os')

console.log('운영체제 정보 -------------------')
console.log('os.arch():', os.arch())
console.log('os.platform():', os.platform())
console.log('os.type():', os.type())
console.log('os.uptime():', os.uptime()) // 부팅이후 시간
console.log('os.hostname():', os.hostname()) // 컴터이름
console.log('os.release():', os.release()) // 운영체제 버전

console.log(`경로-----------`)
console.log(os.cpus()) // 컴퓨터 cpu 정보
console.log(os.cpus().length) 

console.log(`메모리 정보-------------------`)
console.log(os.freemem())  // 사용가능한 RAM 용량
console.log(os.totalmem()) //  전체 RAM 용량




