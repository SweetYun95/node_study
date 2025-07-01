// 논블로킹 방식으로 작성한 코드
// 이전 작업 완료를 기다리지 안고 다음 작업 수행
// setTimeout(콜백함수, 1000)

function longRunningTask() {
   // 오래걸리는 작업
   console.log('작업끝')
}

console.log('시작')
// 오래걸리는 작업에 논블로킹 처리를 해주는게 좋다
//다음작업을 처리하면서 longRunningTask를 동시 실행
setTimeout(longRunningTask,0)
console.log('다음 시작')
