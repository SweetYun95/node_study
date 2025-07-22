import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createItem, getItem } from '../api/itemApi'

// 상품등록
export const createItemThunk = createAsyncThunk('items/createItem', async (itemData, { rejectWithValue }) => {
   try {
      const response = await createItem(itemData)
      return response.data.item
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 전체 상품리스트 가져오기
export const fetchItemsThunk = createAsyncThunk('items/fetchItems', async (data, { rejectWithValue }) => {
   try {
      // data: 검색어, 페이징 처리에 필요한 데이터가 들어있는 객체
      console.log(`💽data: `, data)
      const response = await getItem(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const itemSlice = createSlice({
   name: 'items',
   initialState: {
      item: null, // 상품 단일 정보
      items: [], // 상품 리스트 저장
      pagination: null, // 페이징 객체
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 상품 등록
         .addCase(createItemThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createItemThunk.fulfilled, (state, action) => {
            state.loading = false
            state.item = action.payload // insert한 상품 정보 저장
         })
         .addCase(createItemThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 전체 상품리스트
         .addCase(fetchItemsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchItemsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload.items 
            state.pagination = action.payload.pagination 

         })
         .addCase(fetchItemsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default itemSlice.reducer
