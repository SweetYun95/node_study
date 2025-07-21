import shopmaxApi from './axiosApi'

//회원가입
export const registerUser = async (userData) => {
   try {
      const response = await shopmaxApi.post('/auth/join', userData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error // registerUser() 함수를 실행 한 곳으로 에러메세지를 던짐
   }
}
