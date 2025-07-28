import { Container } from '@mui/material'

import Token from '../components/token/Token'

function TokenPage() {
   return (
      <Container maxWidth="md" sx={{ marginTop: 10, marginBottom: 13 }}>
         <Token />
      </Container>
   )
}

export default TokenPage
