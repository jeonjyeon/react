/**
 * Counter 컴포넌트: 상품 수량을 조절하는 버튼 UI
 * @param {object} props
 * @param {number|string} props.id - 상품의 고유 id
 * @param {number} props.quantity - 현재 상품 수량
 * @param {number} props.maxQuantity - 최대 수량
 * @param {(id: number|string, amount: number) => void} props.onUpdateQuantity - 수량 변경 함수
 */
export default function Counter({
  id,
  quantity,
  maxQuantity,
  onUpdateQuantity,
}) {
  const isMinQuantity = quantity === 1
  const isMaxQuantity = quantity === maxQuantity

  return (
    <div
      className="flex justify-center border border-[color:var(--gray-300,#B3B3B3)] px-2 py-0.5 rounded-[18px] border-solid
  items-center bg-[color:var(--gray-100,#EEE)]"
    >
      <button
        className="flex w-4 h-4 justify-center items-center cursor-pointer disabled:cursor-not-allowed"
        onClick={() => onUpdateQuantity(id, -1)}
        disabled={isMinQuantity}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className="flex w-4 h-4 justify-center items-center cursor-pointer disabled:cursor-not-allowed"
        onClick={() => onUpdateQuantity(id, 1)}
        disabled={isMaxQuantity}
      >
        +
      </button>
    </div>
  )
}
