const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Post, Hashtag, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

// uploads 폴더가 없을 경우 폴더 생성
try {
   fs.readdirSync(`uploads`) // 해당 폴더 있나 확인
} catch (error) {
   console.log(`uploads 폴더 생성합니다.`)
   fs.mkdirSync(`uploads`) // 폴더 생성
}

// 이미지 업로드를 위한 multer 설정
const upload = multer({
   // 저장할 위치와 파일명 지정
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/') // uploads 폴더에 파일 저장
      },
      filename(req, file, cb) {
         // 제주도.jpg
         const decodeFileName = decodeURIComponent(file.originalname) // 파일명 디코딩(한글 파일명 깨짐 방지)
         const ext = path.extname(decodeFileName) //확장자 추출 -> .jpg
         const basename = path.extname(decodeFileName, ext) //확장자 제외 파일명 추출 -> 제주도
         // 파일명: 기존이름 + 업로드 날짜시간 + 확장자 -> 제주도 + 123456789 + .jpg
         cb(null, basename + Date.now() + ext)
      },
   }),
   limits: { fieldSize: 5 * 1024 * 1024 }, // 5MB 파일 크기 제한
})

// 게시물 등록 /localhost:8000/post
// <input type='file' name='img'/>
router.post('/', isLoggedIn, upload.single('img'), async (req, res, next) => {
   try {
      console.log(`🎫파일 정보:`, req.file)

      //업로드 된 파일이 없을 경우
      if (!req.file) {
         const error = new Error(`파일 업로드에 실패 했습니다.`)
         error.status = 400
         return next(error)
      }

      // 게시물 등록
      // post 테이블에 insert
      const post = await Post.create({
         content: req.body.content, // 게시물 내용
         img: `/${req.file.filename}`, // 이미지 url(파일명)=> /제주도123456789.jpg
         user_id: req.user.id, // 작성자 id(PK)
      })

      // 해시태그 등록
      //hashtag 테이블에 insert
      // req.body.hashtags = '#여행#맛집'
      const hashtags = req.body.hashtags.match(/#[^\s#]*/g) // #을 기준으로 해시태그 추출하여 배열로 저장 -> hashtags=[#여행,#맛집]

      // 추출된 해티태그 있?
      if (hashtags) {
         // Promise.all: 여러개의 비동기 작업을 동시에 처리(병렬처리)
         // findOrCreate: where절에 찾는 값이 존재하는지 확인 하고 없으면 create
         // findOrCreate() 비동기 함수, Promise.all 처리는 동시 진행 -> 속도 빨라지나 필수는 아님
         const result = await Promise.all(
            hashtags.map(
               (
                  tag // #여행 + .slice(1) -> 여행
               ) =>
                  Hashtag.findOrCreate({
                     where: { title: tag.slice(1) }, // #을 제외한 문자만
                  })
            )
         )

         HashTagInstance1 = {
            id: 1,
            title: 여행,
            createAt: '2024-12-16T10:10:10',
            updateAt: '2024-12-16T10:10:10',
         }

         HashTagInstance2 = {
            id: 2,
            title: 맛집,
            createAt: '2024-12-16T10:10:12',
            updateAt: '2024-12-16T10:10:12',
         }

         result = [
            [HashTagInstance1, true][(HashTagInstance2, true)], // #여행 해시 태그가 새로 생성됨(false 라면 이미 존재하는 해시태그) // #맛집 해시 태그가 새로 생성됨
         ]
         /*
                    HashTagInstance1 = {
            id: 1,
            title: 여행,
            createAt: '2024-12-16T10:10:10',
            updateAt: '2024-12-16T10:10:10',
          }
          
          HashTagInstance2 = {
            id: 2,
            title: 맛집,
            createAt: '2024-12-16T10:10:12',
            updateAt: '2024-12-16T10:10:12',
          }
          

          result = [
            [HashTagInstance1, true] // #여행 해시 태그가 새로 생성됨(false 라면 이미 존재하는 해시태그)
            [HashTagInstance2, true] // #맛집 해시 태그가 새로 생성됨
          ]
          
          */
         // 연관메서드: addHashtags(): HashTagInstance값을 이용해 hashtag객체를 insert 할 때, posthashtag 테이블 post_id, hashtag_id의 컬럼값이 insert된다
         // posthashtag 테이블(교차테이블)에 insert
         await post.addHashtags(result.map((r) => r[0]))
      }
   } catch (error) {
      error.status = 500
      error.message = '게시물 등록 중 오류가 발생했습니다.'
      next(error)
   }
})

// 게시물 수정 /localhost:8000/post/:id
router.put('/:id', isLoggedIn, upload.single('img'), async (req, res, next) => {
   try {
   } catch (error) {
      error.status = 500
      error.message = '게시물 수정 중 오류가 발생했습니다.'
      next(error)
   }
})

// 게시물 삭제 /localhost:8000/post/:id
router.delete('/:id', isLoggedIn, async (req, res, next) => {
   try {
   } catch (error) {
      error.status = 500
      error.message = '게시물 삭제 중 오류가 발생했습니다.'
      next(error)
   }
})

// 특정 게시물 불러오기(id로 게시물 조회) /localhost:8000/post/:id
router.get('/:id', async (req, res, next) => {
   try {
   } catch (error) {
      error.status = 500
      error.message = '특정 게시물 불러오는 중 오류가 발생했습니다.'
      next(error)
   }
})

// 전체 게시물 불러오기(페이징 기능) /localhost:8000/post?page=1&limit=3
router.get('/', async (req, res, next) => {
   try {
   } catch (error) {
      error.status = 500
      error.message = '게시물 리스트를 불러오는 중 오류가 발생했습니다.'
      next(error)
   }
})

module.exports = router
