// 가격에 콤마를 추가하는 함수
export const formatWithComma = (value) => {
   // '30,000'
   // value 가격
   if (!value) return '' /// 빈 값이면 빈 문자열 리턴

   // 콤마제거 -> 숫자형으로 변경 -> 다시 콤마 추가
   return Number(value.replace(/,/g, '')).toLocaleString('ko-KR')
}

// 가격에 콤마를 제거하는 함수
export const stripComma = (value) => {
   return value.replace(/,/g, '') // 콤마 제거
}
