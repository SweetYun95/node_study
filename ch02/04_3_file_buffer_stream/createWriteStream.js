const fs = require('fs')

const writeStream = fs.createWriteStream('./wrteme2.txt')

// 글쓰기
writeStream.write('이 글을 씁니다. \n')
writeStream.write('한번더 씁니다.')

// 'finish'이벤트"쓰기 스트림이 종료 되었을 때 실행
writeStream.on('finish', () => {
    console.log('완료')
})

// 스트림 종료
writeStream.end()






