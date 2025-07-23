import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function ItemSellDetail() {
   const { id } = useParams()
    const dispatch = useDispatch()
    const {item,error,loading}=useSelector((state)=>state.item)
   return (
      <>
         <></>
      </>
   )
}

export default ItemSellDetail
