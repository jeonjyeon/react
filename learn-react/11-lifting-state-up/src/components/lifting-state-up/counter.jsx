import { useState } from 'react'
import './counter.css'

// Stateless (상위 컴포넌트의 상태 변경 요청)
export default function Counter({ count, setCount }) {
  console.log('Counter 렌더링')

  // count는 부모(App)에서 내려받은 값이므로,
  // 버튼을 누를 때마다 부모의 상태가 바뀌고,
  // 그 값이 다시 모든 하위 컴포넌트에 반영됨.
  return (
    <button
      type="button"
      className="counter"
      onClick={() => setCount((c) => c + 1)}
    >
      {count}
    </button>
  )
}
