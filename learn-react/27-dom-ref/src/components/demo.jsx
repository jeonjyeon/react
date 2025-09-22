// import { jsx as _jsxDev } from 'react/jsx-runtime'
import { useEffect, useState } from 'react'

export default function Demo() {
  const [attach, setAttach] = useState(true)

  useEffect(() => {
    const cleanupId = setTimeout(() => {
      setAttach(false)
    }, 3000)

    return () => {
      clearTimeout(cleanupId)
    }
  }, [])

  // 사이드 이펙트(부수 효과)
  // 이펙트 함수 또는 이벤트 리스너 처럼 부수 효과 처리 함수
  const pRefCallback = (pElement) => {
    console.log('mounted')
    pElement.textContent = 'Ref Callback'

    // react 19+
    return () => {
      console.log('cleanup')
    }
  }

  return attach ? (
    <p ref={pRefCallback}>
      리액트 엘리먼트가 실제 DOM에 패치(patch)된 이후 참조
    </p>
  ) : null

  // return _jsxDev('p', {
  //   // 참조 콜백(ref callback)
  //   ref: pRefCallback,
  //   children: '리액트 엘리먼트가 실제 DOM에 패치(patch)된 이후 참조',
  // })
}
