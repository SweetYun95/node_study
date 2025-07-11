import './App.css'
import './styles/common.css'

import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './features/authSlice'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth) // 로그인 상태, 로그인 한 사용자 정보(로그아웃 상태일때는 null)

   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sigup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
         </Routes>
      </>
   )
}

export default App
