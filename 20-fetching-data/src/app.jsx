import { LearnSection } from '@/components'

export default function App() {
  console.log('App 렌더링')

  // 리액트 렌더링(동기 방식으로 작동)과
  // 무관한 서버에서 데이터 가져오기 코드
  fetch('https://jsonplaceholder.typicode.com/albums/1')
    .then((response) => response.json())
    .then(console.log)
    .catch(console.error)

  return (
    <LearnSection title="데이터 가져오기(fetching data)" showTitle>
      <p>{'앨범 이름'}</p>
    </LearnSection>
  )
}
