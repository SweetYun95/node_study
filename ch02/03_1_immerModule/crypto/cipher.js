// 양방향 암호화: 암호화 한 것을 다시 복호화 할 수 있음, (key 가 필요하다)
const crypto = require('crypto')

const algorithm = 'aes-256-cbc' // 암호화 알고리즘 종류
const key = 'abcdefghijklmnopqrstuvwxyz123456' // 암호화를 복호화 할때 사용될 키
const iv = '1234567890123456' // 초기화 벡터

/*
utf-8: 사람이 읽을 수 있는 문자열을 컴퓨터가 알아볼수 있는 이진데이터로 바꾸는 인코딩 방식
- 한글, 영어, 다른 언어, 이모지 등 모든 문자 표현 가능
예) '암호화할문장' -> <Buffer ec 43 64 d3 12 ...>

base64: 이진데이터를 네트워크 상에서 안전하게 전송하기 위해 텍스트로 바꿈(텍스트 이지만 사람이 알아볼수 없다.)
- 이진데이터를 포함한 암호화 결과, 이미지, 파일 등을 텍스트로 바꿀 때 사용
예) <Buffer ec 43 64 d3 12 ...> -> vl+TiQxMFyN1wKMF92XXbKdwmYx74bmwHS0RAq+yIGA=
*/


// 암호화
const cipher = crypto.createCipheriv(algorithm, key, iv)
let result = cipher.update('암호화할문장','utf-8','base64') // 암호화 + 인코딩
result += cipher.final('base64')
console.log('암호화: ', result)

// 복호화
const decipher = crypto.createDecipheriv(algorithm, key, iv)
let result2 = decipher.update(result, 'base64', 'utf-8') // 복호화 + 디코딩
result2 += decipher.final('utf-8')
console.log('복호화: ', result2)


