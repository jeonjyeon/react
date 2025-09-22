export default function CartFooter({ totalPrice }) {
  return (
    <footer className="flex flex-col items-end gap-5 self-stretch border-t border-gray-700 pt-2">
      <p className="text-[color:var(--gray-700,#4D4D4D)] text-center text-xl not-italic font-bold leading-[normal] tracking-[-0.4px]">
        구매 총액: {totalPrice.toLocaleString()}원
      </p>
    </footer>
  )
}
