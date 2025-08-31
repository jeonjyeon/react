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

      <div className="paragraphes">
        {attach && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <p
            onClick={() => {
              setAttach((a) => !a)
              clearInterval(intervalRef.current)
            }}
            // 1. ref callback demo
            // ref={refCallback}
            // 2. useRef + useEffect demo
            ref={pRef}
            className="focus:outline-8 outline-offset-2 outline-blue-500/40"
          >
            one
          </p>
        )}
        <p>two</p>
        <p>thtree</p>
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
      <h2>아티클</h2>
      <div ref={divRef} className="paragraphes">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim?</p>
        <p>
          Quaerat iusto optio quae accusantium autem! Impedit, possimus soluta!
        </p>
        <p>
          Voluptate exercitationem sint magnam repellendus illo quos aliquam
          recusandae.
        </p>
        <p>
          Sapiente voluptatum consectetur porro, atque quos doloribus.
          Laudantium, placeat.
        </p>
      </div>
    </article>
  )
}
