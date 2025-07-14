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
      console.log(`userData`, userData)
      const response = await snsApi.post(`/auth/join`, userData)
      console.log(`response:`, response)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 로그인
export const loginUser = async (credential) => {
   try {
      console.log(`credential`, credential)
      const response = await snsApi.post(`/auth/login`, credential)
      console.log(`response:`, response)
      return response
   } catch (error) {
      console.error(`API Request 오류:`, error)
      throw error
   }
}

// 로그아웃
export const logoutUser = async () => {
   try {
      const response = await snsApi.get(`/auth/logout`)
      return response
   } catch (error) {
      console.error(`API Request 오류:`, error)
      throw error
   }
}

// 로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await snsApi.get(`/auth/status`)
      return response
   } catch (error) {
      console.error(`API Request 오류:`, error)
      throw error
   }
}

// 포스트 등록
export const createPost = async (postData) => {
   try {
      // postData: 등록할 게시물 데이터가 담겨져 있는 formData 객체
      console.log('postData: ', postData)
      // 🏆 서버에 파일 전송시 반드시 해야하는 headers 설정
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 파일 전송시 반드시 지정
         },
      }

      const response = await snsApi.post('/post', postData, config) // 마지막에 config 추가
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}
