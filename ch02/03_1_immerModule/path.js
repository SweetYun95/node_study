const path = require('path')

console.log('경로 정보 관리----------------------')
console.log(path.sep) // os별로 경로의 구분자를 알려줌

const string = __filename
console.log(string)

console.log('경로 분석 --------------------------')
console.log(path.dirname(string)) // 폴더 경로
console.log(path.extname(string)) // 확장자
console.log(path.basename(string)) // 파일 이름 표시
console.log(path.basename(string, '.js')) // 확장자 제거 한 파일 이름 표시

console.log('경로 조작 --------------------------')
console.log(path.parse(string)) // 파일 경로 분리
console.log(
   // parse한 경로 다시 합치기
   path.format({
      root: 'C:\\',
      dir: 'C:\\project\\04.Nodejs\\node_study\\ch02\\03_1_immerModule',
      base: 'path.js',
      ext: '.js',
      name: 'path',
   })
)
// 슬래시(/)나 역슬래시(\) 사용해도 정상적인 결과
console.log(path.normalize('C://project//node_class\\ch02\\03_1_innerModule'))

console.log(`경로 성격 확인-----------------------------------`)
//절대/상대경로
console.log(path.isAbsolute('C:\\'))
console.log(path.isAbsolute('./home'))

console.log(`경로 계산-----------------------------------`)
// 경로 두개 입력, 첫번째 경로에서 두번째 경로고 나는 법
console.log(path.relative('C:\\project\\node_class\\ch02\\03_1_innerModule\\path.js', 'C:\\'))

// 경로 합치기
console.log(path.join('C:project/node', '/users', '/ezen'))




