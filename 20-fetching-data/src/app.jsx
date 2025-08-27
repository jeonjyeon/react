import { useEffect, useId, useState } from 'react'
import { LearnSection } from '@/components'
import { wait } from './utils'

export default function App() {
  console.log('App 렌더링')

  const [key, setKey] = useState(0)

  const albumInputId = useId()
  const [albumId, setAlbumId] = useState(1)
  const isAlbumInputDisabled = albumId === 1 || albumId === 100

  return (
    <LearnSection title="데이터 가져오기(fetching data)" showTitle>
      <div role="group" className="my-5">
        <label htmlFor={albumInputId} className="mr-2">
          앨범 ID
        </label>
        <input
          type="number"
          className="input disabled:cursor-not-allowed"
          aria-disabled={isAlbumInputDisabled}
          id={albumInputId}
          value={albumId}
          onChange={(e) => {
            const nextAlbumId = Number(e.target.value)
            setAlbumId(nextAlbumId)
          }}
          min={1}
          max={100}
        />
      </div>

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

      <Album id={albumId} />
    </LearnSection>
  )
}

const API_URL = 'https://jsonplaceholder.typicode.com/albums'

function Album({ id }) {
  console.log(`Album ${id} 렌더링`)

  // 데이터 가져오기(fetching data) 상태 관리
  // 1. 로딩(loading | pending)
  const [loading, setLoading] = useState(false)
  // 2. 에러(error)
  const [error, setError] = useState(null)
  // 3. 데이터(data)
  const [data, setData] = useState(null)

  // 부수 효과 관리
  // 상위 컴포넌트에서 전달된 id 속성이 변경되면 다시 이펙트 함수 실행
  useEffect(() => {
    // 로딩 상태 전환
    setLoading(true)
    // 에러 상태 전환
    setError(null)

    // 리액트 렌더링(동기 방식으로 작동)과
    // 무관한 서버에서 데이터 가져오기 코드
    fetch(API_URL + `/${id}`)
      .then(async (response) => {
        await wait(0.4)

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
        setData(responseData)
      })
      // rejected 상태
      .catch((error) => {
        // 에러 상태 전환
        setError(error)
      })
      // resolved 또는 rejected 모든 상태에서 최종 처리
      .finally(() => {
        // 로딩 상태 전환
        setLoading(false)
      })
  }, [id])

  // 상태 관리
  // console.log({ loading, error, data })

  // 조건부 렌더링
  // - 조건문 사용
  // - 조건식 사용
  // - JSX 내부에 조건식 사용

  if (loading) {
    return (
      <p
        role="status"
        aria-live="polite"
        className="text-indigo-300 font-semibold text-2xl"
      >
        로딩 중...
      </p>
    )
  }

  if (error) {
    return (
      <p
        role="alert"
        aria-live="assertive"
        className="text-red-600 font-semibold text-2xl"
      >
        오류 발생!! {error.message}
      </p>
    )
  }

  return (
    <p className="text-indigo-600 font-semibold text-2xl">
      앨범 타이틀 : {data?.id ?? 0} | {data?.title ?? 'Album Title'}
    </p>
  )
}
