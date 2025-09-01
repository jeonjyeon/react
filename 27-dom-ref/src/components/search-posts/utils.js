export const makeEndpoint = (endpoint) => (path) => `${endpoint}/${path}`

export const getQueryFromLocation = () => {
  const params = Object.fromEntries(
    new URLSearchParams(globalThis.location.search)
  )
  return params.q ?? ''
}

export const queryPushInHistory = (nextQuery) => {
  const newUrl = `${globalThis.location.pathname}?q=${encodeURIComponent(nextQuery)}`
  history.pushState({}, '', newUrl)
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
