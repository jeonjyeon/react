import { useState } from 'react'
import { LearnSection } from '@/components'
import Counter from './counter'
import PrintCount from './print-count'

// Stateful
export default function LiftingStateUpDemo() {
  console.log('LiftingStateUpDemo 렌더링')

  // 상태 끌어올리기: 하위 컴포넌트에서 상태를 공유할 수 있도록 상위 컴포넌트에서 관리
  // 하위 컴포넌트가 공유할 상태 및 변경 함수 선언
  const [count, setCount] = useState(0)

  return (
    <LearnSection title="상태 끌어올리기" showTitle>
      <Counter count={count} setCount={setCount} />
      <PrintCount count={count} />
    </LearnSection>
  )
}
