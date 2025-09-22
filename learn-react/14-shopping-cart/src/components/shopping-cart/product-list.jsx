import Counter from './counter'

/**
 * ProductItem 컴포넌트: 상품 정보를 표시하고 수량 조절 Counter를 렌더링
 * @param {object} props
 * @param {object} props.product - 상품 정보 객체
 * @param {(id: number|string, amount: number) => void} props.onUpdateProduct - 상품 수량 변경 함수
 */
export default function ProductItem({ product, onUpdateProduct }) {
  return (
    <li
      key={product.id}
      className="flex h-[100px] items-center gap-3 self-stretch p-2"
    >
      <div
        className={'bg-cover bg-no-repeat w-16 h-16 shrink-0 rounded-[64px]'}
        style={{ backgroundImage: `url(/assets/${product.imageUrl})` }}
      >
        <span className="sr-only">{product.name}</span>
      </div>
      <div className="flex flex-col items-start gap-2 flex-[1_0_0]">
        <strong className="text-[color:var(--gray-700,#4D4D4D)] line-clamp-1  text-xl not-italic font-normal leading-[130%] tracking-[-0.4px]">
          {product.name} {product.size}
        </strong>
        <p className="text-[color:var(--gray-700,#4d4d4d)] text-lg not-italic font-extrabold leading-[100%] tracking-[-0.36px]">
          {product.price.toLocaleString()}원
        </p>
      </div>
      <Counter
        id={product.id}
        quantity={product.quantity}
        maxQuantity={product.maxQuantity}
        onUpdateQuantity={onUpdateProduct}
      />
    </li>
  )
}
