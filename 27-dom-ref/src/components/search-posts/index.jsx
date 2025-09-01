import { useEffect, useState } from 'react'
import { fetchDataByQuery } from './api'
import Divider from './divider'
import Error from './error'
import Loading from './loading'
import SearchController from './search-controller'
import SearchForm from './search-form'
import SearchList from './search-list'
import Status from './status'

export default function SearchQueryDemo() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])

  // 검색 쿼리 초깃값을 현재 URL의 q 파라미터에서 가져오도록 설정
  // 참고: https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams
  const [query, setQuery] = useState('')

  // 브라우저 이전/다음 탐색 시, 검색 쿼리 동기화
  // 참고: https://developer.mozilla.org/ko/docs/Web/API/Window/popstate_event
  useEffect(() => {
    // ...
  }, [])

  // API에서 데이터 가져오기
  useEffect(() => {
    const abortController = new AbortController()
    setLoading(true)
    setError(null)

    fetchDataByQuery(query, { signal: abortController.signal })
      .then((result) => {
        setData(Array.isArray(result) ? result : [])
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false))

    return () => {
      abortController.abort()
    }
  }, [query])

  // 검색 폼 제출 시 쿼리 변경
  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const nextQuery = formData.get('search')

    // URL 변경 시, query 상태 업데이트
    // 참고
    // - https://developer.mozilla.org/ko/docs/Web/API/History/pushState
    // - https://developer.mozilla.org/ko/docs/Web/API/URL/URL
    // ...
    setQuery(nextQuery)
  }

  // 버튼 클릭으로 쿼리 변경
  const handleSearch = (nextQuery) => {
    // URL 변경 시, query 상태 업데이트
    // ...
    setQuery(nextQuery)
  }

  const hasData = !loading && !error && data

  return (
    <section className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-medium mb-6 text-indigo-700 text-center">
        포스트 검색
      </h2>

      <SearchForm key={query} query={query} onSubmit={handleSubmit} />

      <SearchController onSearch={handleSearch} />

      <p className="mt-7 text-center text-slate-500 font-medium">
        {data?.length ?? 0}개의 포스트가 검색되었습니다.
      </p>

      <Divider />

      {loading && <Loading>검색 결과 로딩 중...</Loading>}
      {error && (
        <Error>
          <strong>오류 발생!</strong> {String(error.message || error)}
        </Error>
      )}
      {hasData && data.length === 0 && (
        <Status>
          <b className="text-indigo-700">&quot;{query}&quot;</b>으로 검색된
          결과가 없습니다.
        </Status>
      )}
      {hasData && data.length > 0 && <SearchList data={data} />}
    </section>
  )
}
