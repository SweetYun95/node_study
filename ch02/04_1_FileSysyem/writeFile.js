const fs = require('fs')

// writeFile(작성할 파일 경로, 작성할 글자, 콜백 함수)
fs.writeFile('./writeme.txt', '글이 입력됩니다.', (err) => {
    if (err) {
       // 문제 발생시 err 를 throw
      throw err
   }

    console.log('쓰기 완료') 
    
    // 파일 작성후 읽어 오기
    fs.readFile('./writeme.txt', (err, data) => {
       // data: 파일 내용
       // err: 파일을 읽는 도중 에러 발생시 에러 메세지
       if (err) {
          throw err
       }

       console.log(data) // 이진데이터
       console.log(data.toString()) // 문자로 변환
    })
})