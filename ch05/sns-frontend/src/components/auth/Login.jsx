import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material'
import { useState } from 'react'

function Login() {
const [email, setEmail] = useState('') // 이메일
const [password, setPassword] = useState('') // 패스워드

    // 로그인 버튼 눌렀을 때
    const handleLogin = (e) => {
        
    }

   return (
      <Container maxWidth="sm">
         <Typography variant="h4" gutterBottom>
            로그인
         </Typography>

         {/* {error && (
            <Typography color="error" align="center">
               {error}
            </Typography>
         )} */}

         <form onSubmit={handleLogin}>
            <TextField label="이메일" name="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />

            <TextField label="비밀번호" type="password" name="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

            {/* <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading} sx={{ position: 'relative', marginTop: '20px' }}>
               {loading ? (
                  <CircularProgress
                     size={24}
                     sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                     }}
                  />
               ) : (
                  '로그인'
               )}
            </Button> */}
         </form>

         <p>계정이 없으신가요? 회원가입</p>
      </Container>
   )
}

export default Login
