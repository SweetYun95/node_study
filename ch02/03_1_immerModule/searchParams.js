const url = require('url')
const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript')

console.log(myURL.searchParams)
console.log(myURL.searchParams.getAll('category'))
console.log(myURL.searchParams.get('limit'))
console.log(myURL.searchParams.get('page'))
console.log(myURL.searchParams.has('page')) // 쿼리스트링 내부에 해당 파레메터가 있는지 확인

console.log('키 / 값 ----------------------------------')
console.log(myURL.searchParams.keys())
console.log(myURL.searchParams.values())


console.log('키 / 값 , 추가 제거----------------------------------')
myURL.searchParams.append('filter','es3')
console.log(myURL.searchParams.getAll('filter'))
//제거
myURL.searchParams.delete('filter')
console.log(myURL.searchParams.get('filter'))

//searchParams객체를 문자열로
console.log(myURL.searchParams.toString())









