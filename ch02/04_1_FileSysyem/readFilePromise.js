const fs = require('fs').promises

// readFile(읽을 파일 경로, 콜백함수)
fs.readFile('./readme.txt')
   .then((data) => {
      console.log(data.toString()) // 파일 내용 출력
   })
   .catch((err) => {
      console.log(err) // 에러 발생시 에러 출력
   })
