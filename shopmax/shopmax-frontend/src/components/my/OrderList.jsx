import { Box, Card, CardMedia, CardContent, Typography, Button, Pagination, CircularProgress } from '@mui/material'
import Grid from '@mui/material/Grid'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import dayjs from 'dayjs' //날짜 시간 포맷해주는 패키지
import 'dayjs/locale/ko' // 한글 로케일 불러오기
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOdersThunk } from '../../features/orderSlice'

function OrderList() {
   const dispatch = useDispatch()
   const { orders, pagination, loading, error } = useSelector((state) => state.order)
   const [page, setPage] = useState(1) // 시작 날짜 (포맷전)

   const [startDate, setStartDate] = useState(null) // 시작 날짜 (포맷전)
   const [endDate, setEndDate] = useState(null) // 끝 날짜 (포맷전)
   const [formattedStartDate, setFormattedStartDate] = useState('') // 시작 날짜 (포맷후)
   const [formattedEndDate, setFormattedEndDate] = useState('') // 끝 날짜 (포맷후)

   //
   useEffect(() => {
      dispatch(
         getOdersThunk({
            page,
            limit: 5,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
         })
      )
   }, [dispatch, page, formattedStartDate, formattedEndDate])

   // 날짜 데이터를 포맷
   const handleDateFilter = () => {
      if (!startDate || !endDate) {
         alert('시작일과 종료일을 지정해 주세요.')
         return
      }

      // 시작일이 종료일보다 늦은 경우
      if (dayjs(startDate).isAfter(dayjs(endDate))) {
         alert('시작일이 종료일보다 늦을 수 없습니다.')
         return
      }
      console.log(`startDate: ${startDate}, endDate: ${endDate}`)

      // 날짜 포맷 저장 : YYYY-MM-DD 형식)
      setFormattedStartDate(dayjs(startDate).format('YYYY-MM-DD'))
      setFormattedEndDate(dayjs(endDate).format('YYYY-MM-DD'))

      setPage(1) // 날짜 검색 할때마다 페이지는 1로 초기화
   }

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
         <Box p={2}>
            {/* 날짜 검색 */}
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  flexWrap: 'wrap', // 화면 크기에 따라 줄바꿈
                  mb: 7,
                  mt: 5,
               }}
            >
               <DatePicker label="시작일" sx={{ width: '35px' }} value={startDate} onChange={(nweValue) => setStartDate(nweValue)} />
               <DatePicker label="종료일" sx={{ width: '35px' }} value={endDate} onChange={(nweValue) => setEndDate(nweValue)} />
               <Button variant="contained" onClick={handleDateFilter}>
                  날짜 검색
               </Button>
            </Box>
         </Box>
      </LocalizationProvider>
   )
}

export default OrderList
