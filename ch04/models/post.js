const Sequelize = require('sequelize')

module.exports = class Post extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            content: {
               type: Sequelize.STRING(140),
               allowNull: false,
            },
            img: { type: Sequelize.STRING(200), allowNull: true },
         },
         {
            sequelize,
            timestamps: true, // createAt, updateAt 컬럼을 자동으로 생성할 지 여부 => 생성함
            underscored: false, // 컬럼이름을 카멜케이스로 유지할건지 -> 유지 안함
            modelName: 'Post', // 시퀄라이즈에서 사용하는 모델이름
            tableName: `posts`, // DB에서 사용하는 실제 테이블 이름
            paranoid: false, // 소프트 삭제 활성화 여부(deleteAt 컬럼 생성) -> 비활성화
            charset: 'utf8mb4', // 데이터베이스 생성할 때 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', // 데이터베이스 생성할때 collate과 똑같이 사용}
         }
      )
   }
   static associate(db) {
      // n:m 관계 정의
      // throug: 교차테이블 명
      db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' })
   }
}
