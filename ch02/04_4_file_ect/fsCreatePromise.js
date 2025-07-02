const fs = require('fs').promises
const constants = require('fs').constants // 파일 시스템 관련 상수를 가져온다

// ./folder 에 대한 접근 권한 확인
// F : 파일 존재 여부 , W :  쓰기 권한 여부  , R : 읽기권한 확인
fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
   .then(() => {
      // 폴더가 이미 있는 경우 reject 처리
      return Promise.reject('이미 폴더 있음')
   })
   .catch((err) => {
      // 폴더가 없는 경우
      if (err.code === 'ENOENT') {
         // 폴더 생성
         console.log('폴더 없음')
         return fs.mkdir('./folder')
      }

      // 폴더가 없는거 외에 다른 에러 발생시 에러 전달
      console.log('err1: ', err)
      return Promise.reject(err)
   })
    .then(() => {
        // 폴더 생성이 성공 했을때
    console.log('폴더 생성 성공')
        //file.js 파일 생성
        // 두번째 인수(어떤 동작으로 파일을 만들건지) => w: 쓰기 모드, r: 읽기 모드,a: 기존 파일에 추가
        return fs.open('./folder/file.js', 'w')
    })
    .then((fd) => {
        // 파일 생성이 성공 했을 때
        console.log('빈 파일 만들었어', fd)

        // 생성한 파일의 이름을 file.js -> newFile.js로 변겅
        return fs.rename('./folder/file.js', './folder/newFile.js')
    }).then(() => {
        // 파일 이름 바꾸기 성공
        console.log('이름 바꿨다')
    })
   .catch((err) => {
      // 모든 단계에서 발생한 에러 처리
      console.error('err2: ', err)
   })
