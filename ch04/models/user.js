const Sequelize = require('sequelize')

// class 명은 파일명과 똑같이 작성하되 대문자 시작
module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            // name 컬럼 정의
            name: {
               type: Sequelize.STRING(20), // varchar(20)
               allowNull: false, // null 제약조건 -> not null
               unique: true, // unique 제약조건 -> 중복허용 X
            },

            // age 컬럼 정의
            age: {
               type: Sequelize.INTEGER.UNSIGNED, // 양수만 가능한 정수(20)
               allowNull: false, // null 제약조건 -> not null
            },

            // married 컬럼 정의
            married: {
               type: Sequelize.BOOLEAN, // 참, 거짓이 저장되는 타입 tnyint
               allowNull: false, // null 제약조건 -> not null
            },

            // comment 컬럼 정의
            comment: {
               type: Sequelize.TEXT, // text
               allowNull: false, // null 제약조건 -> not null,
            },

            // create_at 컬럼 정의
            create_at: {
               type: Sequelize.DATE, // 날짜와 시간을 저장하는 datetime
               allowNull: false, // null 제약조건 -> not null,
               defaultValue: sequelize.NOW, // 디폴트값
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false, // 컬럼이름을 카멜케이스로 유지할건지 -> 유지 안함
            modelName: 'User', // 시퀄라이즈에서 사용하는 모델이름
            tableName: `Users`, // DB에서 사용하는 실제 테이블 이름
            paranoid: false, // 소프트 삭제 활성화 여부(deleteAt 컬럼 생성) -> 비활성화
            charset: 'utf8mb4', // 데이터베이스 생성할 때 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', // 데이터베이스 생성할때 collate과 똑같이 사용
         }
      )
   }
   static associate(db) {
      db.User.hasMany(db.Comment, {
         // User : Comment = 1 : n
         // User가 Comment를 가지고 있다.(User:부모, Comment:자식)
         foreignKey: 'commenter', // comments 테이블에서 외래키로 사용할 컬럼명
         sourceKey: 'id', // comments 테이블에 외래키로 제공할 컬럼명
      })
   }
}
