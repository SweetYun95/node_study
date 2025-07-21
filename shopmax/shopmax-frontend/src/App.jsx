import { Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

function App() {
   return (
      <>
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
         </Routes>
         <Footer />
      </>
   )
}

export default App
