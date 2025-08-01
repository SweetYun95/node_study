import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import PostCreatePage from './pages/PostCreatePage'
import PostEditPage from './pages/PostEditPage'
import { checkAuthStatusThunk } from './features/authSlice'

import './App.css'
import './styles/common.css'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth) // 로그인 상태, 로그인 한 사용자 정보(로그아웃 상태일때는 null)
   const location = useLocation()
   // location.key: 현재 위치 고유의 키
   console.log(`location.key: `, location.key)

   // 새로고침 시 redux 에서 사용하는 state 가 사라지므로 지속적인 로그인 상태 확인을 위해 사용
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<Home key={location.key} isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts/create" element={<PostCreatePage />} />
            <Route path="/posts/edit/:id" element={<PostEditPage />} />
         </Routes>
      </>
   )
}

export default App
