// scripts/fixUploadNames.js
const fs = require('fs').promises
const path = require('path')
const { Post } = require('../models') // models/index.js 에서 export 된 Post

;(async () => {
   const uploadDir = path.join(__dirname, '..', 'uploads')
   const files = await fs.readdir(uploadDir)

   const fixTasks = files
      .filter((file) => /^\.\w+?\d+\.\w+$/.test(file)) // .jpg1752....jpg 같은 패턴
      .map(async (badName) => {
         // 1) 새 파일명 만들기
         const matched = badName.match(/^\.(\w+)(\d+)(\.\w+)$/) // [.][jpg][123][.jpg]
         if (!matched) return
         const [, extNoDot, timestamp, ext] = matched
         const newName = `unknown_${timestamp}${ext}` // unknown_123456.jpg

         // 2) 실제 파일 rename
         await fs.rename(path.join(uploadDir, badName), path.join(uploadDir, newName))

         // 3) DB도 업데이트
         await Post.update({ img: `/${newName}` }, { where: { img: `/${badName}` } })

         console.log(`✔ ${badName} → ${newName}`)
      })

   await Promise.all(fixTasks)
   console.log('모든 파일/DB 레코드 수정 완료')
})()
