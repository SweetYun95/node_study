import { Container } from '@mui/material'
import PostEditForm from '../components/post/PostEditForm'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostByIdThunk } from '../features/postSlice'

function PostEditPage() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { id } = useParams() // post의 id를 path 파라메터에서 가져온다
   const { post, loading, error } = useSelector((state) => state.posts)

   // 게시물 데이터 불러오기
   useEffect(() => {
      dispatch(fetchPostByIdThunk(id))
   }, [dispatch, id])

   // 게시물 수정
   const onPostEdit = (postData) => {}

   if (loading) return <p>로딩 중...</p>
   if (error) return <p>에러발생: {error}</p>

   return (
      <Container maxWidth="md">
         <h1>게시물 수정</h1>
         {post && <PostEditForm onPostEdit={onPostEdit} initialValues={post} />}
      </Container>
   )
}

export default PostEditPage
