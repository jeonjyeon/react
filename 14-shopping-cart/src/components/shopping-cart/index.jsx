import { Component, useState } from 'react'
import { useImmer } from 'use-immer'
import INITIAL_PRODUCTS from '@/data/products.json'
import CartFooter from './cart-footer'
import CartHeader from './cart-header'
import CartList from './cart-list'

/**
 * ShoppingCartClass 컴포넌트: 장바구니 전체 UI 및 상태 관리
 * @returns {React.ReactElement}
 */
export class ShoppingCartClass extends Component {
  // 상태 선언
  state = {
    products: INITIAL_PRODUCTS,
  }

  render() {
    // 상태 구조 분해 할당
    const { products } = this.state

    // 총 가격
    const totalPrice = products.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    )

    return (
      <section className="m-4 flex max-w-[692px] min-w-[320px] flex-col justify-between items-center p-5  border-[color:var(--gray-700,#4d4d4d)] rounded-lg border-[6px] border-solid">
        <CartHeader />
        <CartList
          products={products}
          onUpdateProduct={this.updateProductQuantity}
        />
        <CartFooter totalPrice={totalPrice} />
      </section>
    )
  }

  updateProductQuantity = (productId, amount) => {
    // 방법 1: prevState 전체를 받아서 새 배열을 반환 (가장 일반적인 패턴)
    this.setState((prevState) => {
      return {
        products: prevState.products.map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity + amount }
            : product
        ),
      }
    })

    // 방법 2: 구조분해 할당으로 products만 받아서 새 배열 반환 (스타일 차이, 결과는 동일)
    this.setState(({ products: currentProducts }) => ({
      products: currentProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + amount }
        }
        return product
      }),
    }))

    /*
    차이점 요약:
    - 방법 1은 prevState 전체를 받아서, 필요한 상태를 직접 참조해 새 객체를 반환하는 가장 일반적인 setState 패턴입니다.
    - 방법 2는 구조분해 할당으로 products만 꺼내서, 동일하게 새 배열을 반환합니다. 스타일 차이만 있고, 동작은 완전히 같습니다.
    - 둘 다 불변성을 유지하며, 기존 배열/객체를 직접 수정하지 않습니다.
    */
  }
}

/**
 * ShoppingCart 컴포넌트: 장바구니 전체 UI 및 상태 관리
 * @returns {React.ReactElement}
 */
export function ShoppingCart() {
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
