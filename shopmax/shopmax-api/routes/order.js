const express = require('express')
const { sequelize, Order, Item, Img, User, OrderItem } = require('../models')
const { isLoggedIn } = require('./middlewares')
const { Op } = require('sequelize')
const router = express.Router()

// 주문 localhost:8000/order
router.post('/', isLoggedIn, async (req, res, next) => {
   try {
      /*
    ✨트랜잭션 처리" 주문 처리 중 에러 발생시 차감된 재고를 복구하지 않으면 데이터가 불일치 상태가 되므로 트랜잭션 처리 한다

    <트랜잭션: 쪼갤 수 없는 업무 단위
    - Order 테이블에 주문내역 insert
    - Item 테이블에서 재고 차감
    - OrderItem 테이블에 주문상품  insert
    >
    ㄴ 위 3가지 중 하나에서 문제 발생시 3가지 다 취소되고 복구시킴(RollBack)
    */

      const transaction = await sequelize.transaction() // 하나의 트랜잭션

      // 주문 상품 목록 데이터
      // req.body = { items: [{itemId: 1, count: 2 }, {itemId: 2, count: 1 }] }
      const { items } = req.body

      // 회원 확인(주문은 회원만 가능
      const user = await User.findByPk(req.user.id)
      if (!user) {
         const error = new error(`회원이 존재하지 않습니다.`)
         error.status = 404
         return next(error)
      }

      // 1. Order 테이블에 주문내역 insert
      const order = await Order.create(
         {
            userId: user.id, // 주문자 id(user테이블의 PK)
            orderDate: new Date(), // 현재날짜와 시간
            orderStatus: 'ORDER', // 주문 상태
         },
         { transaction } // 하나의 트랜잭션으로 묶을 작업에 { transaction } 작성
      )

      // 2. Item 테이블에서 재고 차감
      /*
      Promise.all(): 비동기 작업들을 병렬실행(여러작업을 동시 실행)을 통해  성능을 최적화
      각 비동기 작업 async (item)=>{...} 을 병렬로 실행한다.
      아래와 같이 for문으로 처리하는건 비효율적(고객이 여러 상품을 한번에 주문할 수 있으므로)
      다만, 단순하게 findByPk만 한다면 아래와 같이 처리해도 괜춘
      for(const item of items) {
        const product = await Item.findByPk(item.itemId, { transaction })
        ...
        ...
        }
        하지만 상품확인, 재고차감, 재고 update등 여러가지 일을 한번에 처리하므로 비동기+병렬 처리 추천
        */

      let totalOrderPrice = 0 // 총 주문상품 가격

      const orderItemsData = await Promise.all(
         // req.body = { items: [{itemId: 1, count: 2 }, {itemId: 2, count: 1 }] }
         items.map(async (item) => {
            // 1. 주문한 상품이 있는지 확인
            const product = await Item.findByPk(item.itemId, { transaction })

            if (!product) {
               throw new Error(`상품 id: ${item.itemId}인 상품이 존재하지 않습니다.`)
            }

            // 2. 주문한 상품의 재고가 있는지 확인 후 재고 차감
            // 재고 < 주문한 상품의 수량
            if (product.stockNumber < item.count) {
               throw new Error(`상품 id: ${item.itemId}인 상품의 재고가 부족합니다.`)
            }
            // 재고 차감
            product.stockNumber -= item.count

            // 3. 재고차감 후 item 테이블에 재고 update
            await product.save({ transaction })

            // 4. 총 주문 상품 가격 누적합산
            // items: [{ itemId: 1, count: 2 },{ itemId: 2, count: 1 },]
            // totalOrderPrice = 0
            const orderItemPrice = product.price * item.count
            totalOrderPrice += orderItemPrice

            // 5. orderItems 테이블에 insert 해줄 객체를 return
            return {
               orderId: order.id,
               itemId: product.id,
               orderPrice: orderItemPrice,
               count: item.count,
            }
         })
      )

      //3. OrderItem 테이블에 주문상품  insert
      await OrderItem.bulkCreate(orderItemsData, { transaction })

      // 트랜잭션 커밋
      await transaction.commit()
      res.status(201).json({
         success: true,
         message: `주문이 성공적으로 생성 되었습니다.`,
         orderId: order.id, // 주문 아이디
         totalPrice: totalOrderPrice, // 총 주문 상품 금액
      })
   } catch (error) {
      await transaction.rollback() // 트랜잭션 롤백
      error.status = error.status || 500
      error.message = error.message || '상품 주문 중 오류가 발생했습니다.'
      next(error)
   }
})

module.exports = router
