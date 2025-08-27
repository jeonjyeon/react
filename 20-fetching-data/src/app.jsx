import { useEffect, useState } from 'react'
import { LearnSection } from '@/components'
import { wait } from './utils'

const API_URL = 'https://jsonplaceholder.typicode.com/albums/100'

export default function App() {
  console.log('App 렌더링')

  const [key, setKey] = useState(0)

  // 데이터 가져오기(fetching data) 상태 관리
  // 1. 로딩(loading | pending)
  const [loading, setLoading] = useState(false)
  // 2. 에러(error)
  const [error, setError] = useState(null)
  // 3. 데이터(data)
  const [album, setAlbum] = useState(null)

  // 부수 효과
  useEffect(() => {
    // 로딩 상태 전환
    setLoading(true)
    // 에러 상태 전환
    setError(null)

    // 리액트 렌더링(동기 방식으로 작동)과
    // 무관한 서버에서 데이터 가져오기 코드
    fetch(API_URL)
      .then(async (response) => {
        await wait(2)

        if (response.ok) {
          return response.json()
        }

        if (response.status === 404) {
          throw new Error('API 요청에 따른 응답된 데이터를 찾을 수 없습니다.')
        }
      })
      // resolved 상태
      .then((responseData) => {
        // 데이터 업데이트
        setAlbum(responseData)
      })
      .catch((error) => {
        // 에러 상태 전환
        setError(error)
      })
      // resolved 또는 refected 모든 상태에서 최종 처리
      .finally(() => {
        // 로딩 상태 전환
        setLoading(false)
      })
  }, [])

  // 상태 관리
  // console.log({ loading, error, data: album })

  // 조건부 렌더링
  // - 조건문 사용
  // - 조건식 사용
  // - JSX 내부에 조건식 사용
  let renderElement = null

  if (loading) {
    renderElement = (
      <p
        role="status"
        aria-live="polite"
        className="text-indigo-300 font-semibold text-2xl"
      >
        로딩 중...
      </p>
    )
  } else if (error) {
    // Error { name, message, stack }
    renderElement = (
      <p
        role="alert"
        aria-live="assertive"
        className="text-red-500 font-semibold text-2xl"
      >
        오류 발생: {error.message}
      </p>
    )
  } else {
    renderElement = (
      <p className="text-indigo-500 font-semibold text-2xl">
        앨범 이름: {album?.title ?? 'Album title'}
      </p>
    )
  }

  return (
    <LearnSection title="데이터 가져오기(fetching data)" showTitle>
      {renderElement}
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
