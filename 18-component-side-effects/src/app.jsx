import { useEffect, useState } from 'react'
import { LearnSection } from '@/components'

// 컴포넌트 렌더링 (상태 관리)
// 사이드 이펙트 (부수 효과 : 외부 시스템에서 데이터 가져오기 : 항상 실행 (종속성 없음))
// 컴포넌트와 외부 시스템 동기화 (부수 효과에서 상태 업데이트)

export default function App() {
  // 리액트 렌더링 프로세스 구간: 시작
  const [message, setMessage] = useState('컴포넌트의 부수 효과 관리')

  // 리액트 컴포넌트의 부수 효과 관리를 위한 특별한 훅 함수
  useEffect(
    // 이펙트 콜백(함수) : 필수
    // - 부수 효과 처리
    // - 리액트 컴포넌트 렌더링과 분리된 별도의 공간
    () => {
      // 내부 코드는 꼭 순수하지 않아도 됩니다.
      // 왜냐면 여기는 이펙트 함수 내부니까요!
      // - componentDidMount (*) : 처음 마운트 이후 1회 실행 (서버에 데이터 가져오기)
      // - componentDidUpdate (*) : 컴포넌트가 다시 실행될 때 마다 N회 실행
      console.log('컴포넌트 마운트 이후 실행')
      // console.log(
      //   '함수 컴포넌트의 이펙트 함수 내부 영역: ',
      //   document.querySelector('[data-target]')
      // )

      // - componentWillUnmount
    },
    // 종속성(의존성) 목록 추가
    // 종속성이 비었다? (렌더링 처음에만 실행: componentDidMount )
    []
  )

  // 아래 코드는 렌더링과 무관한 부수 효과
  // console.log(
  //   '함수 컴포넌트의 렌더(몸체) 영역: ',
  //   document.querySelector('[data-target]')
  // )

  return (
    <LearnSection title="이펙트 관리 훅" showTitle>
      <p data-target>{message}</p>
      <button
        className="button mt-4"
        type="button"
        onClick={() => setMessage((m) => m + '😎')}
      >
        설명 업데이트
      </button>
    </LearnSection>
  )
  // 리액트 렌더링 프로세스 구간: 끝
}
