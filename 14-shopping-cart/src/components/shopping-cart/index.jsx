import { useState } from 'react'
import { useImmer } from 'use-immer'
import INITIAL_PRODUCTS from '@/data/products.json'
import CartFooter from './cart-footer'
import CartHeader from './cart-header'
import CartList from './cart-list'

/**
 * ShoppingCart 컴포넌트: 장바구니 전체 UI 및 상태 관리
 * @returns {React.ReactElement}
 */
export default function ShoppingCart() {
  // 상품 갯수
  const [products, setProducts] = useImmer(INITIAL_PRODUCTS)
  // const [products, setProducts] = useState(INITIAL_PRODUCTS)

  // 총 가격
  const totalPrice = products.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  )

  /**
   * 상품별 수량 조절 함수
   * @param {number|string} productId - 상품 id
   * @param {number} amount - 변경할 수량(양수: 증가, 음수: 감소)
   */
  // useImmer 사용 코드
  const updateProductQuantity = (productId, amount) => {
    setProducts((draft) => {
      const product = draft.find((p) => p.id === productId)
      if (product) {
        product.quantity += amount
      }
    })
  }

  // useState 사용 코드
  // const updateProductQuantity = (productId, amount) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product.id === productId
  //         ? { ...product, quantity: product.quantity + amount }
  //         : product
  //     )
  //   )
  // }

  return (
    <section className="m-4 flex max-w-[692px] min-w-[320px] flex-col justify-between items-center p-5  border-[color:var(--gray-700,#4d4d4d)] rounded-lg border-[6px] border-solid">
      <CartHeader />
      <CartList products={products} onUpdateProduct={updateProductQuantity} />
      <CartFooter totalPrice={totalPrice} />
    </section>
  )
}
