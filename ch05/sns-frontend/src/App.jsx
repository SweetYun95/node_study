import './App.css'
import './styles/common.css'

import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

import { Route, Routes } from 'react-router-dom'

function App() {
   return (
      <>
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sigup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
         </Routes>
      </>
   )
}

export default App
