import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { wait } from '../../utils'

export default function UserProfileTable() {
  const [state, setState] = useImmer({
    loading: false,
    error: null,
    data: null,
  })

  useEffect(() => {
    console.log(`Users 렌더링`)
    const abortController = new AbortController()
    const fetchOptions = { signal: abortController.signal }

    async function fetchData() {
      const USERS_API_URL = 'http://localhost:4000/users'

      setState((draft) => {
        draft.loading = true
        draft.error = null
        draft.data = null
      })

      await wait(0.9)

      try {
        const response = await fetch(USERS_API_URL, fetchOptions)

        if (!response.ok && response.status === 404) {
          throw new Error('사용자 데이터 베이스를 찾을 수 없습니다.')
        }

        const result = await response.json()
        console.log(result)
        setState((draft) => {
          draft.loading = false
          draft.data = result
        })
      } catch (error) {
        if (error.name === 'AbortError') return
        setState((draft) => {
          draft.loading = false
          draft.error = error
        })
      } finally {
        setState((draft) => {
          draft.loading = false
        })
      }
    }

    fetchData()

    return () => {
      abortController.abort()
    }
  }, [])

  // 조건부 렌더링
  if (state.loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="font-semibold text-center text-4xl bg-amber-100 h-[200px] leading-[200px]"
      >
        사용자 프로필 로딩중...
      </div>
    )
  }

  if (state.error) {
    return (
      <div role="alert" aria-live="assertive" className=" bg-red-600 h-fit p-8">
        <strong className="font-semibold text-center text-4xl text-white">
          Error
        </strong>
        <br />
        <p className="text-2xl text-white">{state.error.message}</p>
      </div>
    )
  }

  return (
    <table className="min-w-200 border-2 border-sky-900">
      <caption className="sr-only">사용자 프로필</caption>
      <thead className="bg-gray-100 border-b border-gray-300">
        <tr>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            이름
          </th>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            아이디
          </th>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            이메일
          </th>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            도시
          </th>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            회사명
          </th>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            슬로건
          </th>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            주요사업
          </th>
        </tr>
      </thead>
      <tbody className="text-center border-1 border-gray-300">
        {state.data?.map((user) => {
          return (
            <tr key={user.id}>
              <td className="p-1 border-1 text-center border-sky-900">
                {user.name}
              </td>
              <td className="p-1 border-1 text-center border-sky-900">
                <code>{user.username}</code>
              </td>
              <td className="p-1 border-1 text-center border-sky-900">
                <a
                  href={`email:${user.email}`}
                  className="text-sky-600 hover:text-sky-700"
                >
                  {user.email}
                </a>
              </td>
              <td className="p-1 border-1 text-center border-sky-900">
                {user.address?.city}
              </td>
              <td className="p-1 border-1 text-center border-sky-900">
                {user.company?.name}
              </td>
              <td className="p-1 border-1 text-center border-sky-900">
                {user.company?.catchPhrase}
              </td>
              <td className="p-1 border-1 text-center border-sky-900">
                {user.company?.business}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
