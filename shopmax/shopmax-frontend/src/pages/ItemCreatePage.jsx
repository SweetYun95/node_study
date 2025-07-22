import { Container } from '@mui/material'
import ItemCreateForm from '../components/item/ItemCreateForm'

function ItemCreatePage() {
   return (
      <Container maxWidth="md" sx={{ marginTop: 10, marginBottom: 13 }}>
         <h1>상품 등록</h1>
         <ItemCreateForm />
      </Container>
   )
}

export default ItemCreatePage
