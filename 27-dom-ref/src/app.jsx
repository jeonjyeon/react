import { useEffect, useRef, useState } from 'react'
import { LearnSection } from '@/components'

// import Demo from './components/demo'

export default function App() {
  const [attach, setAttach] = useState(true)

  // 1. ref callback demo
  // const refCallback = (el) => {
  //   el?.setAttribute('tabindex', '-1')
  //   el?.focus()
  //   const intervalId = setInterval(() => {
  //     console.log(new Date().toLocaleTimeString())
  //   }, 1000)

  //   return () => {
  //     clearInterval(intervalId)
  //   }
  // }

  // 2. useRef + useCallback
  const pRef = useRef(null)
  const intervalRef = useRef()

  useEffect(() => {
    const pElement = pRef.current

    pElement?.setAttribute('tabindex', '-1')
    pElement?.focus()

    intervalRef.current = setInterval(() => {
      console.log(new Date().toLocaleTimeString())
    }, 1000)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <LearnSection title="DOM 참조" showTitle={false}>
      <Demo />

      <div className="paragraphes space-y-2 [&_p]:text-gray-700 [&_p]:font-semibold">
        {attach && (
          <div className="bg-amber-300 p-5 pt-2.5 my-2">
            <p
              // 1. ref callback demo
              // ref={refCallback}
              // 2. useRef + useEffect demo
              ref={pRef}
              className="focus:outline-16 outline-offset-4 outline-blue-500/40"
            >
              하나
            </p>
            <button
              className="button mt-2"
              onClick={() => {
                setAttach((a) => !a)
                clearInterval(intervalRef.current)
              }}
            >
              토글
            </button>
          </div>
        )}
        <p>둘</p>
        <p>셋</p>
      </div>
    </LearnSection>
  )
}

function Demo() {
  useEffect(() => {
    const pElements = document.querySelectorAll('.paragraphes')
    console.log(pElements)
  }, [])

  // useRef 훅의 쓰임새
  // 1. 값 참조로서 useRef 활용
  // 2. 컴포넌트 렌더링에 따른 실제 DOM 참조 접근/조작 (접근성 필수!!!)

  // 리액트 엘리먼트가 렌더링된 이후 DOM 요소 참조
  const articleRef = useRef(null)
  const divRef = useRef(null)

  useEffect(() => {
    console.log(articleRef.current) // 실제 DOM 요소인 <article>
    console.log(divRef.current) // 실제 DOM 요소인 <div>
  }, [])

  return (
    <article ref={articleRef}>
      <h2 className="text-4xl font-thin text-indigo-800">아티클</h2>
      <div
        ref={divRef}
        className="paragraphes my-4 text-base leading-relaxed text-indigo-900"
      >
        <p>리액트에서 ref는 DOM 요소에 직접 접근할 때 사용합니다.</p>
        <p>
          useRef 훅은 렌더링 사이에 값을 유지하고 DOM에 접근하는 용도로
          활용됩니다.
        </p>
        <p>
          ref callback은 DOM 요소가 마운트되거나 언마운트될 때 특정 로직을
          실행할 수 있게 해줍니다.
        </p>
        <p>
          useRef와 useEffect를 함께 사용하면 DOM 요소에 접근하여 포커스 설정이나
          측정 등의 작업을 수행할 수 있습니다.
        </p>
      </div>
    </article>
  )
}
