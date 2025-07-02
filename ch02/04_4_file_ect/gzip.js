// 파일을 읽은 후 압축
const zlib = require('zlib')
const fs = require('fs')

// 읽기 스트림 생성
const readStream = fs.createReadStream('readme4.txt')

//gzip 압축을 수행하기위한 변환 스트림 생성
const zlibStream = zlib.createGzip()

// 압축된 데이터를 저장하기 위한 쓰기 스트림
const writeStream = fs.createWriteStream('readme4.txt.gz')

// 읽기 슽림 -> 압축 슽림 -> 쓰기 슽림 으로 데이터 전달(pipe 처리)
// readme4.txt 읽은 후 gzip형식으로 압축해 readme4.txt.gz 로 저장
readStream.pipe(zlibStream).pipe(writeStream)
