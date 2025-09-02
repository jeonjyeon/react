export const makeEndpoint = (endpoint) => (path) => `${endpoint}/${path}`

export const getQueryFromLocation = () => {
  const searchParams = new URLSearchParams(globalThis.location.search)
  return searchParams.get('q') ?? ''
}

export const queryPushInHistory = (nextQuery) => {
  const newUrl = new URL(globalThis.location.href)
  newUrl.searchParams.set('q', nextQuery)
}

export const fetchData = async (url, options = {}) => {
  if (!url) return

  try {
    const response = await fetch(url, options)
    if (!response.ok && response.status === 404)
      throw new Error(`검색된 결과를 찾을 수 없습니다.`)
    const data = response.json()
    return data
  } catch (error) {
    if (error.name === 'AbortError') return
    return error
  }
}
