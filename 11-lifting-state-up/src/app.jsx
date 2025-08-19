import { useState } from 'react'
import { LearnSection } from '@/components'

export default function App() {
  // 상태 끌어올리기: 하위 컴포넌트에서 상태를 공유할 수 있도록 상위 컴포넌트에서 관리
  // 하위 컴포넌트가 공유할 상태 및 변경 함수 선언
  const [count, setCount] = useState(0)

  return (
    <LearnSection title="상태 끌어올리기" showTitle={false}>
      <p>다른 컴포넌트와 상태 공유하기</p>
      <Counter count={count} setCount={setCount} />
      <PrintCount count={count} />
    </LearnSection>
  )
}

function Counter({ count, setCount }) {
  return (
    // count는 부모(App)에서 내려받은 값이므로,
    // 버튼을 누를 때마다 부모의 상태가 바뀌고,
    // 그 값이 다시 모든 하위 컴포넌트에 반영됨.
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      {count}
    </button>
  )
}

function PrintCount({ count = -1 }) {
  // 현재 count 값을 출력함.
  // 부모(App)에서 내려받은 값을 그대로 보여줌.
  return <output style={{ padding: 12 }}>{count}</output>
}
