import { useState } from 'react'
import './style.css'

export default function ManageArrayState() {
  // 실습 코드 작성
  // 1. 초깃값이 ['A', 'B', 'C']인 배열을 상태로 생성
  const initialArray = ['A', 'B', 'C']
  const [array, setArray] = useState(initialArray)
  const maxValue = array.length

  // 2. 배열의 첫 번째 요소 제거 기능
  const removeFirst = () => setArray(array.slice(1))

  // 3. 배열에서 특정 문자 제거 기능
  const removeCharacter = (char) => {
    setArray(array.filter((item) => item !== char))
  }

  // 4. 배열의 맨 앞에 새로운 요소 추가 기능
  const addCharacterToFront = (char) => {
    setArray([char, ...array])
  }

  // 5. 배열의 맨 뒤에 새로운 요소 추가 기능
  const addCharacterToEnd = (char) => {
    setArray([...array, char])
  }

  // 6. 배열의 모든 요소 제거하는 기능
  const clearArray = () => {
    setArray([])
  }

  // 7. 배열을 초깃값으로 되돌릴 수 있는 기능
  const resetArray = () => {
    setArray(initialArray)
  }

  // 8. 배열에 있는 모든 `A` 요소를 `H`로 변경할 수 있는 기능
  const replaceAToH = () => {
    setArray(array.map((item) => (item === 'A' ? 'H' : item)))
  }

  // 9. 상태를 가지는 인풋과 버튼을 만든 후, 입력 값을 배열의 맨 앞에 추가할 수 있는 기능
  const [frontInput, setFrontInput] = useState('')
  const addToFrontInput = () => {
    if (!frontInput) return
    setArray([...frontInput, ...array])
    setFrontInput('')
  }

  // 10. 배열의 원하는 인덱스에 새로운 요소를 추가할 수 있는 기능
  const [insertValue, setInsertValue] = useState('')
  const [insertIndex, setInsertIndex] = useState(0)

  const addAtIndex = () => {
    if (!insertValue || isNaN(insertIndex)) return
    const newArray = [...array]
    // array.splice(시작인덱스, 삭제할개수, 추가할값1, 추가할값2, ...)
    newArray.splice(insertIndex, 0, ...insertValue)
    setArray(newArray)
    setInsertValue('')
    setInsertIndex(0)
  }

  return (
    <section className="manage-array-state">
      <h2>배열 상태 관리 실습</h2>

      <output>
        <strong>배열 상태</strong> : {array.join(', ')}
      </output>

      <div role="group">
        <button type="button" onClick={removeFirst}>
          첫 번째 요소 제거
        </button>
        <button type="button" onClick={() => removeCharacter('B')}>
          'B' 제거
        </button>
        <button type="button" onClick={() => addCharacterToFront('X')}>
          맨 앞에 'X' 추가
        </button>
        <button
          type="button"
          onClick={() => {
            addCharacterToEnd('Y')
          }}
        >
          맨 뒤에 'Y' 추가
        </button>
        <button type="button" onClick={clearArray}>
          모두 제거
        </button>
        <button type="button" onClick={resetArray}>
          초기화
        </button>
        <button type="button" onClick={replaceAToH}>
          모든 'A'를 'H'로 변경
        </button>
      </div>

      <div role="group" data-layout-row>
        <input
          type="text"
          placeholder="추가할 값"
          value={frontInput}
          onChange={(e) => setFrontInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addToFrontInput()
          }}
        />
        <button type="button" onClick={addToFrontInput}>
          맨 앞에 추가
        </button>
      </div>

      <div role="group" data-layout-row>
        <input
          type="text"
          placeholder="추가할 값"
          value={insertValue}
          onChange={(e) => {
            setInsertValue(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addAtIndex()
          }}
        />
        <input
          type="number"
          placeholder="인덱스"
          min={0}
          max={maxValue}
          value={insertIndex}
          onChange={(e) => {
            setInsertIndex(Number(e.target.value))
          }}
        />
        <button type="button" onClick={addAtIndex}>
          원하는 위치에 추가
        </button>
      </div>
    </section>
  )
}
