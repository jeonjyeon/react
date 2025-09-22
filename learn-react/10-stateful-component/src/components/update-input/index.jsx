import { useId, useState } from 'react'
import './style.css'

/**
 * UpdateInput 컴포넌트
 * @param {Object} props
 * @param {string} props.label - 인풋 요소의 레이블
 * @param {string} props.value - 인풋 요소의 초기 값
 */
export default function UpdateInput({ label, value }) {
  console.log('UpdateInput 컴포넌트 렌더링')

  // 리액트 훅 함수를 사용해 함수형 컴포넌트의 상태 관리
  // const stateAdapter = useState('지연')
  // console.log(stateAdapter.at(0)) // 현재 상태 값
  // console.log(stateAdapter.at(1)) // 상태 업데이트 함수

  const [state, setState] = useState(value) // [state, setState]
  const id = useId()

  // 상태 선언
  // const name = '지연'

  // 상태 업데이트
  // const setName = () => {}

  // 이벤트 핸들러
  const handleInput = (e) => {
    // console.log(e.target.value)
    const nextState = e.target.value
    setState(nextState) // 상태 업데이트
  }

  return (
    <>
      <div className="update-input">
        <label htmlFor={id}>{label}</label>
        {/* uncontrolled component */}
        <input id={id} type="text" defaultValue={state} onInput={handleInput} />
      </div>
      <output>{state || '입력된 상태 값'}</output>
    </>
  )
}
