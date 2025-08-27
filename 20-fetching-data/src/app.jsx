import { useEffect, useState } from 'react'
import { LearnSection } from '@/components'

export default function App() {
  console.log('App 렌더링')

  const [key, setKey] = useState(0)

  // 데이터 가져오기(fetching data) 상태 관리
  // 1. 로딩(loading | pending)
  const [loading, setLoading] = useState(false)
  // 2. 에러(error)
  const [error, setError] = useState(null)
  // 3. 데이터(data)
  const [data, setData] = useState(null)

  useEffect(() => {
    // 로딩 상태 전환
    setLoading(true)
    // 에러 상태 전환
    setError(null)

    // 리액트 렌더링(동기 방식으로 작동)과
    // 무관한 서버에서 데이터 가져오기 코드
    fetch('https://jsonplaceholder.typicode.com/albums/1')
      .then((response) => response.json())
      .then((responseData) => {
        // 데이터 업데이트
        setData(responseData)

        // 로딩 상태 전환
        setLoading(false)
      })
      .catch((error) => {
        // 에러 상태 전환
        // alert(error.message)
        setError(error)
        // 로딩 상태 전환
        setLoading(false)
      })
  }, [])

  console.log({ loading, error, data })

  // 조건부 렌더링
  // - 조건문 사용
  // - 조건식 사용
  // - JSX 내부에 조건식 사용

  return (
    <LearnSection title="데이터 가져오기(fetching data)" showTitle>
      <p>{'앨범 이름'}</p>
      <div role="group" className="mt-5">
        <button
          type="button"
          className="button"
          onClick={() => setKey((k) => k + 1)}
        >
          렌더링 키 변경
        </button>
        <output>렌더링 키: {key}</output>
      </div>
    </LearnSection>
  )
}
