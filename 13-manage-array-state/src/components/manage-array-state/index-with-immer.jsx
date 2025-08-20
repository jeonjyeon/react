import { useState } from 'react'
import { useImmer } from 'use-immer'
import './style.css'

export default function ManageArrayStateWithImmer() {
  // 실습 코드 작성
  // 1. 초깃값이 ['A', 'B', 'C']인 배열을 상태로 생성
  const INITIAL_ARRAY_STATE = ['A', 'B', 'C']
  const [array, setArray] = useImmer(INITIAL_ARRAY_STATE)
  const maxValue = array.length

  // 2. 배열의 첫 번째 요소 제거 기능
  const removeFirst = () =>
    setArray((draft) => {
      draft.shift()
    })

  // 3. 배열에서 특정 문자 제거 기능
  const removeCharacter = (char) => {
    setArray(array.filter((item) => item !== char))
  }

  // 4. 배열의 맨 앞에 새로운 요소 추가 기능
  const addCharacterToFront = (char) => {
    setArray((draft) => {
      draft.unshift(char)
    })
  }

  // 5. 배열의 맨 뒤에 새로운 요소 추가 기능
  const addCharacterToEnd = (char) => {
    setArray((draft) => {
      draft.push(char)
    })
  }

  // 6. 배열의 모든 요소 제거하는 기능
  const clearArray = () => {
    setArray([])
  }

  // 7. 배열을 초깃값으로 되돌릴 수 있는 기능
  const resetArray = () => {
    setArray(INITIAL_ARRAY_STATE)
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
  const INITIAL_INSERT_STATE = {
    index: 0,
    value: '',
    z: { y: { k: { p: 0 } } }, // 중첩된 객체의 예시(실제 기능에는 필요 없고, immer의 중첩 상태 관리 연습용)
  }
  const [insertState, setInsertState] = useImmer(INITIAL_INSERT_STATE)
  console.log(insertState.z.y.k.p)

  const addAtIndex = () => {
    if (!insertState.value || isNaN(insertState.index)) return
    const newArray = [...array]
    // array.splice(시작인덱스, 삭제할개수, 추가할값1, 추가할값2, ...)
    newArray.splice(insertState.index, 0, ...insertState.value)
    setArray(newArray)
    setInsertState(INITIAL_INSERT_STATE)
  }

  return (
    <section className="manage-array-state">
      <h2>배열 상태 관리 실습 (Immer)</h2>

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
          value={insertState.value}
          onChange={(e) => {
            setInsertState((draft) => {
              draft.value = e.target.value
              // useImmer 훅을 사용해 상태를 관리할 경우
              // immer의 draft 객체를 통해 깊은(중첩된) 상태도 직접 변경할 수 있다는 예시
              draft.z.y.k.p += 1

              // 리액트의 불변성 유지를 위해 작성해야 할 코드
              // return {
              //   ...draft,
              //   z: {
              //     ...draft.z,
              //     y: {
              //       ...draft.z.y,
              //       k: {
              //         ...draft.z.y.k,
              //         p: draft.z.y.k.p + 1,
              //       },
              //     },
              //   },
              // }
            })
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
          value={insertState.index}
          onChange={(e) => {
            setInsertState((draft) => {
              draft.index = Number(e.target.value)
              // immer의 draft 객체를 통해 깊은(중첩된) 상태도 직접 변경할 수 있다는 예시
              draft.z.y.k.p -= 1
            })
          }}
        />
        <button type="button" onClick={addAtIndex}>
          원하는 위치에 추가
        </button>
      </div>
    </section>
  )
}
