import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser } from '../api/snsApi'

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
