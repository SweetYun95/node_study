import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL

//axios 인스턴스 생성
const snsApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json', // request, response 할때 json 객체로 주고 받겠다
   },
   // localhost:5173 -> 프론트엔드
   // localhost:8000 -> 백엔드
   // request, response 주소가 다른경우 보안상 서로 통신 X
   // 주소가 다른데 통신하는 경우 cors 에러 발생
   // 주소가 다르면 쿠키와 셰션도 주고받지 못하므로 {withCredentials: true} 설정
   withCredentials: true, //세션이나 쿠키를 request에 포함
})

// 회원가입
export const registerUser = async (userData) => {
   try {
      // userData: 회원가입 창에서 입력한 데이터
       // localhost:8000/auth/join
       console.log(`userData: ${userData}`)
       const response = await snsApi.post(`/auth/join`, userData)
       console.log(`response: ${response}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
