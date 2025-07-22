import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Stack, Pagination, Select, MenuItem, FormControl, InputLabel, IconButton, Typography, Link } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'

import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

function ItemList() {
   const [searchTerm, setSearchTerm] = useState('') // 검색어
   const [searchCategory, setSearchCategory] = useState('itemNm') // 검색 카테고리(상품명 or 상품설명)
   const [sellCategory, setSellCategory] = useState('') // SELL, SOLD_OUT
   const [searchSubmit, setSearchSubmit] = useState(false) // 검색버튼 클릭 상태
   const [page, setPage] = useState(1) // 페이지 번호

   // 판매 상태 변경
   const handleSellCategoryChange = (e) => {
      setSellCategory(e.target.value)
      setPage(1) // 판매상태 변경시 1페이지로 바꿈
   }

   // 검색 기준 변경
   const handleSearchCategoryChange = (e) => {
      setSearchCategory(e.target.value)
      setPage(1)
   }

   // 검색어 변경시
   const handleSearchChange = (e) => {
      setSearchTerm(e.target.value)
   }

   // 검색 버튼 클릭시
   const handleSearchSubmit = (e) => {
      e.preventDefault()
      setSearchSubmit((prev) => !prev) // 검색 버튼 클릭 상태 토글
      setPage(1)
   }

   return (
      <Box sx={{ p: 4 }}>
         {/* 등록버튼 */}
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <RouterLink to="/items/create">
               <Button variant="contained">상품등록</Button>
            </RouterLink>
         </Box>

         {/* 테이블 */}
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell align="center">번호</TableCell>
                     <TableCell align="center">상품명</TableCell>
                     <TableCell align="center">가격</TableCell>
                     <TableCell align="center">판매상태</TableCell>
                     <TableCell align="center">등록일</TableCell>
                     <TableCell align="center">삭제</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  <TableRow>
                     <TableCell align="center">-</TableCell>
                     <TableCell align="center">-</TableCell>
                     <TableCell align="center">-</TableCell>
                     <TableCell align="center">-</TableCell>
                     <TableCell align="center">-</TableCell>
                     <TableCell align="center">-</TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </TableContainer>

         {/* 페이징 */}
         <Stack spacing={2} sx={{ mt: 3, mb: 3, alignItems: 'center' }}>
            <Pagination />
         </Stack>

         {/* 검색 및 필터 */}
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 5 }}>
            <FormControl sx={{ minWidth: 120 }} size="small">
               <InputLabel id="sell_category">판매상태</InputLabel>
               <Select labelId="sell_category" value={sellCategory} label="판매상태" onChange={handleSellCategoryChange}>
                  <MenuItem value="">전체</MenuItem>
                  <MenuItem value="SELL">판매중</MenuItem>
                  <MenuItem value="SOLD_OUT">품절</MenuItem>
               </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }} size="small">
               <InputLabel id="search_category">검색기준</InputLabel>
               <Select labelId="search_category" value={searchCategory} label="검색기준" onChange={handleSearchCategoryChange}>
                  <MenuItem value="itemNm">상품명</MenuItem>
                  <MenuItem value="itemDetail">상품설명</MenuItem>
               </Select>
            </FormControl>

            <form
               onSubmit={handleSearchSubmit}
               style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '8px',
                  minWidth: '500px',
               }}
            >
               <FormControl sx={{ flex: 1 }}>
                  <TextField label="검색" variant="outlined" size="small" value={searchTerm} onChange={handleSearchChange} placeholder="검색어 입력" fullWidth />
               </FormControl>
               <Button variant="contained" type="submit">
                  검색
               </Button>
            </form>
         </Box>
      </Box>
   )
}

export default ItemList
