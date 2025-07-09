const Sequelize = require('sequelize')

module.exports = class Comment extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            comment: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            create_at: {
               type: Sequelize.DATE,
               allowNull: true,
               defaultValue: Sequelize.NOW,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false, // 컬럼이름을 카멜케이스로 유지할건지 -> 유지 안함
            modelName: 'Comment', // 시퀄라이즈에서 사용하는 모델이름
            tableName: `comments`, // DB에서 사용하는 실제 테이블 이름
            paranoid: false, // 소프트 삭제 활성화 여부(deleteAt 컬럼 생성) -> 비활성화
            charset: 'utf8mb4', // 데이터베이스 생성할 때 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', // 데이터베이스 생성할때 collate과 똑같이 사용}
         }
      )
   }
   static associate(db) {
      // Comment는 User에 속해있다.(User:부모, Comment:자식)
      db.Comment.belongsTo(db.User, {
         foreignKey: 'commenter', // 외래키로 사용할 컬럼명
         targetKey: 'id', // 부모테이블에서 가져올(참조할) 컬럼명 영
      })
   }
}
