import ProductItem from '@/components/shopping-cart/product-list'

/**
 * CartList 컴포넌트: 상품 목록을 렌더링
 * @param {object} props
 * @param {Array<object>} props.products - 상품 정보 배열
 * @param {(id: number|string, amount: number) => void} props.onUpdateProduct - 상품 수량 변경 함수
 */
export default function CartList({ products, onUpdateProduct }) {
  return (
    <>
      <h3 className="sr-only">상품 목록</h3>
      <ul className="flex w-full flex-col justify-between items-start shrink-0 self-stretch">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onUpdateProduct={onUpdateProduct}
          />
        ))}
      </ul>
    </>
  )
}
