const fs = require('fs').promises

// writeFile(작성할 파일 경로, 작성할 글자, 콜백 함수)
fs.writeFile('./writeme2.txt', '글이 입력됩니다.')
   .then(() => {
      console.log('파일 쓰기 완료')

      // 파일 작성후 읽어 오기
      return fs.readFile('./writeme2.txt')
   })
   .then((data) => {
      console.log(data.toString()) // 파일 내용 출력
   })
   .catch((err) => {
      console.log(err) // 에러 발생시 에러 출력
   })
