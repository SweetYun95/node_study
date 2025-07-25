import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createOrder, getOrders } from '../api/orderApi'

// 주문하기
export const createOrderThunk = createAsyncThunk('order/createOrder', async (orderData, { rejectWithValue }) => {
   try {
      // orderData: 주문 상품 목록 데이터
      // orderData = { items: [{itemId: 1, count: 2 }, {itemId: 2, count: 1 }] }
      const response = await createOrder(orderData)
      return response.data.orderId
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 주문리스트
export const getOdersThunk = createAsyncThunk('order/getOders', async (orderData, { rejectWithValue }) => {
   try {
      // orderData: 주문 상품 목록 데이터
      // orderData = { items: [{itemId: 1, count: 2 }, {itemId: 2, count: 1 }] }
      const response = await getOrders(orderData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})
const orderSlice = createSlice({
   name: 'order',
   initialState: {
      orders: [],
      pagination: null,
      loading: true,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         //주문하기
         .addCase(createOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createOrderThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(createOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         //주문리스트
         .addCase(getOdersThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getOdersThunk.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload.orders
            state.pagination = action.payload.pagination
         })
         .addCase(getOdersThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default orderSlice.reducer
