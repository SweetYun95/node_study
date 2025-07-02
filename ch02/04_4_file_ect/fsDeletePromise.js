const fs = require('fs').promises

// './folder' 디렉토리 내용 확인
fs.readdir('./folder')
   .then((dir) => {
      console.log('폴더 내용확인', dir)
      return fs.unlink('./folder/newFile.js')
   })
   .then(() => {
       // 파일 삭제 성공 메시지
       console.log(`파일 삭제 성공`)
       return fs.rmdir('./folder') // folder 삭제
   }).then(() => {
       console.log('삭제 성공')
   }).catch((err) => {
       console.error(err) // 모든 단계에서 발생된 에러 처리
   })
