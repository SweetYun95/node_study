import shopmaxApi from './axiosApi'

// 주문하기
export const createOrder = async (orderData) => {
   try {
      // orderData: 주문 상품 목록 데이터
      // orderData = { items: [{itemId: 1, count: 2 }, {itemId: 2, count: 1 }] }
      console.log('🧪 orderData:', orderData) // ✅ 실제 구조 확인
      const response = await shopmaxApi.post('/order', orderData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 주문목록
export const getOrders = async (data) => {
   try {
      const { page, limit, startDate, endDate } = data

      const response = await shopmaxApi.get(`/order/list?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 주문 취소
export const cancelOrder = async (id) => {
   try {
      const response = await shopmaxApi.post(`/order/cancel/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 주문 삭제
export const deleteOrder = async (id) => {
  try {
     const response = await shopmaxApi.delete(`/order/delete/${id}`)
     return response
  } catch (error) {
     console.error(`API Request 오류: ${error}`)
     throw error
  }
}
