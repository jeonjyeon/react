import { wait } from '@/utils'
import { fetchData, makeEndpoint } from './utils'

// makeEndpoint 커링 함수를 사용해 API 호출 함수 생성
const api = makeEndpoint('http://localhost:4000')

export const fetchUserbyId = async (userId, options) => {
  if (!userId) return
  return fetchData(api(`users/${userId}`), options)
}

export const fetchDataByQuery = async (query, options = {}) => {
  await wait(0.65)

  const queryString = query ? `?q=${query}` : ''

  const postData = await fetchData(api(`posts${queryString}`), options)

  if (postData) {
    for (const item of postData) {
      const user = await fetchUserbyId(item.userId)
      item.user = user
    }
  }
  return postData
}
