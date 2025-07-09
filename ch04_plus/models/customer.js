const Sequelize = require('sequelize')

module.exports = class Customer extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            fullName: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            email: {
               type: Sequelize.STRING(150),
               allowNull: false,
               unique: true,
            },
            phoneNumber: {
               type: Sequelize.STRING(20),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false, // 컬럼이름을 카멜케이스로 유지할건지 -> 유지 안함
            modelName: 'Customer', // 시퀄라이즈에서 사용하는 모델이름
            tableName: `customers`, // DB에서 사용하는 실제 테이블 이름
            paranoid: false, // 소프트 삭제 활성화 여부(deleteAt 컬럼 생성) -> 비활성화
            charset: 'utf8mb4', // 데이터베이스 생성할 때 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', // 데이터베이스 생성할때 collate과 똑같이 사용
         }
      )
   }
    static associate(db) {
        db.Customer.hasMany(db.Order, {
           foreignKey: `CustomerId`,
           sourceKey: `id`,
        })
   }
}
