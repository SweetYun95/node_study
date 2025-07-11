import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, logoutUser, registerUser } from '../api/snsApi'

/*
? : (optional chaining)
error = {} -> response: undefined 상태
이때 error.response.date = > TypeError 에러 발생 (Cannot read property 'data' of undefined)
? 로 optional chaining을 사용하면 위와 같은 에러가 발생되지 않는다.
*/

// rejectWithValue(): 에러메시지를 rejected에 action.payload 로 전달
// 회원가입
export const registerUserThunk = createAsyncThunk(`auth/registerUser`, async (userData, { rejectWithValue }) => {
   // userData: 회원가입 정보
   try {
      const response = await registerUser(userData)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 로그인
export const loginUserThunk = createAsyncThunk(`auth/loginUserThunk`, async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginUser(credentials)
      return response.data.user
      
   } catch (error) {
       return rejectWithValue(error.response?.data?.message)
   }
})

// 로그아웃
// _(언더바)는 매개변수 값이 없을 때 사용
export const logoutUserThunk = createAsyncThunk(`auth/logoutUserThunk`, async (_, { rejectWithValue }) => {
   try {
      const response = await logoutUser()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 로그인 상태확인
export const checkAuthStatusThunk = createAsyncThunk(`auth/checkAuthStatusThunk`, async (_, { rejectWithValue }) => {
   try {
      const response = await logoutUser()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})


const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null, // 사용자 정보 객체
      isAuthenticated: false,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(registerUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(registerUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload // rejectWithValue
         })
   },
})

export default authSlice.reducer
