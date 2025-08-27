import { useEffect, useId, useState } from 'react'
import { LearnSection } from '@/components'
import { wait } from './utils'

export default function App() {
  const [userId, setUserId] = useState(1)
  const userInputId = useId()
  const isUserInputDisabled = userId === 1 || userId === 20

  return (
    <LearnSection title="데이터 가져오기(fetching data)" showTitle>
      <div role="group" className="my-5">
        <label htmlFor={userInputId} className="mr-2">
          사용자
        </label>
        <input
          type="number"
          className="input disabled:cursor-not-allowed"
          aria-disabled={isUserInputDisabled}
          id={userInputId}
          value={userId}
          onChange={(e) => {
            const nextUserId = Number(e.target.value)
            setUserId(nextUserId)
          }}
          min={1}
          max={20}
        />
      </div>
      <User userId={userId} />
    </LearnSection>
  )
}

function User({ userId }) {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
  })

  useEffect(() => {
    console.log(`Users ${userId} 렌더링`)
    const abortController = new AbortController()
    const fetchOptions = { signal: abortController.signal }

    // 데이터 가져오기
    fetch(`http://localhost:4000/users/${userId}`, fetchOptions)
      .then((response) => {
        if (!response.ok && response.status === 404) {
          // throw new Error(response.statusText)
          throw new Error(
            `요청된 사용자 ${userId}는 존재하지 않는 리소스입니다.`
          )
        }
        setState((prevState) => ({
          ...prevState,
          loading: true,
          error: null,
        }))
        return response.json()
      })
      .then((responseData) => {
        console.log('데이터 가져오기 -> data 상태 업데이트')
        setState((prevState) => ({
          ...prevState,
          data: responseData,
        }))
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        setState((prevState) => ({
          ...prevState,
          error,
        }))
      })
      .finally(() => {
        console.log(`Users ${userId} 렌더링 종료`)
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }))
      })

    return () => {
      // 중복된(이전) 요청 취소
      abortController.abort()
    }
  }, [userId])

  if (state.loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="text-slate-400 text-xl font-extrabold"
      >
        사용자 "{userId}" 데이터 로딩 중...
      </div>
    )
  }

  if (state.error) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="text-red-600 text-xl font-extrabold"
      >
        {state.error.name.toUpperCase()} {state.error.message}
      </div>
    )
  }

  return (
    <table className="min-w-[320px] border border-gray-300 rounded overflow-hidden bg-white">
      <tbody>
        <tr className="border-b last:border-b-0">
          <th className="px-4 py-2 text-left bg-gray-50 font-semibold text-gray-700 w-32">
            ID
          </th>
          <td className="px-4 py-2">{state.data?.id}</td>
        </tr>
        <tr className="border-b last:border-b-0">
          <th className="px-4 py-2 text-left bg-gray-50 font-semibold text-gray-700">
            Name
          </th>
          <td className="px-4 py-2">{state.data?.name}</td>
        </tr>
        <tr className="border-b last:border-b-0">
          <th className="px-4 py-2 text-left bg-gray-50 font-semibold text-gray-700">
            Username
          </th>
          <td className="px-4 py-2">{state.data?.username}</td>
        </tr>
        <tr className="border-b last:border-b-0">
          <th className="px-4 py-2 text-left bg-gray-50 font-semibold text-gray-700">
            Email
          </th>
          <td className="px-4 py-2">{state.data?.email}</td>
        </tr>
        <tr>
          <th className="px-4 py-2 text-left bg-gray-50 font-semibold text-gray-700">
            Address
          </th>
          <td className="px-4 py-2">
            {state.data?.address
              ? `${state.data.address.city}, ${state.data.address.suite}, ${state.data.address.zipcode}`
              : ''}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

// --------------------------------------------------------------------------

function FetchDataDemo() {
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
      <AlbumAsyncIIFEDemo id={albumId} />
    </LearnSection>
  )
}

const ALBUM_API_URL = 'https://jsonplaceholder.typicode.com/albums'

// 비동기 함수 + IIFE 패턴 데모
function AlbumAsyncIIFEDemo({ id }) {
  console.log(`Album ${id} 렌더링`)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    const fetchOptions = { signal: abortController.signal }

    // 즉시 실행 함수 표현식(IIFE) 패턴
    // 1회성 호출(소비) -> 재사용 가능성이 적다.
    // 한 번만 호출하면 된다. -> 즉시 실행하자!
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        await wait(0.9)

        const response = await fetch(ALBUM_API_URL + '/' + id, fetchOptions)

        if (!response.ok && response.status === 404) {
          throw new Error('API 요청에 따른 응답된 데이터를 찾을 수 없습니다.')
        }

        const responseData = await response.json()
        console.log('데이터 가져오기 -> data 상태 업데이트')
        setData(responseData)
      } catch (error) {
        if (error.name === 'AbortError') return
        setError(error)
      } finally {
        setLoading(false)
      }
    })()

    return () => {
      abortController.abort()
    }
  }, [id])

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

// --------------------------------------------------------------------------
// 비동기(async) 함수 데모

// 클라이언트 환경에서 렌더링되는
// 리액트 컴포넌트는 항상 동기 방식으로 작동되어야 함
function AlbumAsyncDemo({ id }) {
  console.log(`Album ${id} 렌더링`)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    const fetchOptions = { signal: abortController.signal }

    // 비동기 함수로 작성 (Promise 대신)
    // 비동기 함수 내에서 오류를 캐치하려면? - try ... catch
    async function fetchAlbum() {
      try {
        setLoading(true)
        setError(null)

        // 느린 네트워크 시뮬레이션
        await wait(0.9)

        const response = await fetch(ALBUM_API_URL + '/' + id, fetchOptions)

        if (!response.ok && response.status === 404) {
          throw new Error('API 요청에 따른 응답된 데이터를 찾을 수 없습니다.')
        }

        const responseData = await response.json()
        console.log('데이터 가져오기 -> data 상태 업데이트')
        setData(responseData)
      } catch (error) {
        if (error.name === 'AbortError') return
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlbum()

    return () => {
      abortController.abort()
    }
  }, [id])

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

// --------------------------------------------------------------------------
// 이전 요청 중단(abort) 데모
// - 중단(Abort) 컨트롤러 활용
// - AbortController 클래스
// - AbortController 인스턴스 생성 (예: const controller = new AbortController())
// - AbortController 인스턴스는 속성(controller.signal)과 메서드(controller.abort())

function AlbumAbortDemo({ id }) {
  console.log(`Album ${id} 렌더링`)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    // 요청 중단할 수 있는 AbortController 인스턴스(객체)
    const abortController = new AbortController()

    fetch(ALBUM_API_URL + '/' + id, {
      // 요청 중단을 위해 생성된 abortController의
      // 시그널(signal, 신호)를 fetch 요청의 옵션에 연결(설정)
      signal: abortController.signal,
    })
      .then(async (response) => {
        await wait(0.4)
        if (response.ok) {
          return response.json()
        }

        if (response.status === 404) {
          throw new Error('API 요청에 따른 응답된 데이터를 찾을 수 없습니다.')
        }
      })
      .then((responseData) => {
        console.log('데이터 가져오기 -> data 상태 업데이트')
        setData(responseData)
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      // 중복된(이전) 요청 취소
      abortController.abort()
    }
  }, [id])

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

// --------------------------------------------------------------------------
// 이전 요청 무시(ignore) 데모

function AlbumIgnoreDemo({ id }) {
  console.log(`Album ${id} 렌더링`)

  // 데이터 가져오기(fetching data) 상태 관리
  // 1. 로딩(loading | pending)
  const [loading, setLoading] = useState(false)
  // 2. 에러(error)
  const [error, setError] = useState(null)
  // 3. 데이터(data)
  const [data, setData] = useState(null)

  // 부수 효과 관리
  // - mount
  // - effect ([1]: ignore = false)
  // - unmount
  // - cleanup ([1]: ignore = true)
  // - remount
  // - response ([1]: ignore = true) - view update ignore
  // - effect ([2]: ignore = false)
  // - response ([2]: ignore = false) - view update
  // 상위 컴포넌트에서 전달된 id 속성이 변경되면 다시 이펙트 함수 실행
  useEffect(() => {
    // 이펙트 함수 내부에
    // 1회 요청을 무시 여부를 식별하는 지역 변수 선언
    let ignore = false

    // 로딩 상태 전환
    setLoading(true)
    // 에러 상태 전환
    setError(null)

    // 리액트 렌더링(동기 방식으로 작동)과
    // 무관한 서버에서 데이터 가져오기 코드
    fetch(ALBUM_API_URL + '/' + id)
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
        // 개발 중, 엄격 모드에서 이펙트가 2회 실행되다 보니
        // 데이터 상태 업데이트도 2회 실행된다.
        // 자... 그렇다면? 2회 네트워크 요청(데이터 가져오기)를 하더라도
        // 실제 데이터 상태 업데이트 반영은 1회로 제한할 수 없을까?
        // - 1회 요청 -> 2회 요청
        // - 1회 데이터 상태 업데이트(무시: ignore) -> 2회 데이터 상태 업데이트(적용)
        if (!ignore) {
          console.log('데이터 가져오기 -> data 상태')
          setData(responseData)
        }
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

    // 클린업(정리) 함수
    return () => {
      // 무시(ignore) 변수 값을 "1회 요청을 무시하라!"로 변경
      ignore = true
    }
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
