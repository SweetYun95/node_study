// 단방향 암호화: 복호화 할 수  없다
const crypto = require('crypto')

// 64bytes 의 랜덤한 바이트 date를 생성함
crypto.randomBytes(64, (err, buf) => {
   // buf: 랜덤한 바이트 데이터
   console.log(buf)

   //buf를 base64 문자열로 변환 해서 사람이 읽을 수 있도록 인코딩 -> salt값
   const salt = buf.toString('base64')
   console.log('salt: ', salt)

   // salt와 sha512알고리즘을 이용해 100000번 반복하여 암호화
   crypto.pbkdf2('password111', salt, 100000, 64, 'sha512', (err, key) => {
      // 암호환한 결과를 base64로 인코딩 해 출력
      console.log(key.toString('base64'))
   })
})
