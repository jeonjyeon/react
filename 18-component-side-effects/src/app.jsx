import { useEffect, useState } from 'react'
import { LearnSection } from '@/components'

// 컴포넌트 렌더링 (상태 관리)
// 사이드 이펙트 (부수 효과 : 외부 시스템에서 데이터 가져오기 : 항상 실행 (종속성 없음))
// 컴포넌트와 외부 시스템 동기화 (부수 효과에서 상태 업데이트)

export default function App() {
  // 리액트 렌더링 프로세스 구간: 시작

  // 리액트 반응성 상태 변경에 따른 이펙트 함수 실행 (조건 처리) ----------

  // 첫 번째 상태 [message] 관심사의 분리 : 시작 --------------------------------

  const [message, setMessage] = useState('컴포넌트의 부수 효과 관리')
  // 첫 번째 상태가 변경될 때 마다 콜백되는 이펙트 함수
  useEffect(() => {
    console.log(`업데이트 된 message = ${message}`)
  }, [message])

  // 첫 번째 상태 [message] 관심사의 분리 : 종료 --------------------------------

  // 첫 번째 상태 [year] 관심사의 분리 : 시작 -----------------------------------

  const [year, setYear] = useState(2025)
  // 두 번째 상태가 변경될 때 마다 콜백되는 이펙트 함수
  useEffect(() => {
    // console.log(`업데이트 된 year = ${year}`)
    document.title = `HELLO REACT! (${year})`
  }, [year])

  // 첫 번째 상태 [year] 관심사의 분리 : 종료 -----------------------------------

  // 여러 상태 변경에 관심을 둔 이펙트 함수 : 시작 ---------------------------------

  useEffect(() => {
    console.log(`year = ${year} / message = ${message}`)
  }, [message, year])

  // 여러 상태 변경에 관심을 둔 이펙트 함수 : 종료 ---------------------------------

  // 마운트 이후, 1회 실행 ------------------------------------

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
      // console.log('컴포넌트 마운트 이후 실행')
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

  const [toggle, setToggle] = useState(false)

  return (
    <LearnSection title="이펙트 관리 훅" showTitle>
      <p data-target>
        {year}년도 핵심! {message}
      </p>
      <button
        className="button mt-4"
        type="button"
        onClick={() => setToggle((t) => !t)}
      >
        컨트롤 토글
      </button>
      {toggle && <Controller year={year} setYear={setYear} />}
      <button
        className="button mt-4"
        type="button"
        onClick={() => setMessage((m) => m + '😎')}
      >
        설명 업데이트 ({year})
      </button>
    </LearnSection>
  )
  // 리액트 렌더링 프로세스 구간: 끝
}

function Controller({ year, setYear }) {
  // year 속성(반응성 데이터)가 변경될 때 마다 실행되는 이벤트 추가
  useEffect(() => {
    console.log(`업데이트 된 year = ${year}`)

    // 타이머 설정 <- 외부 시스템
    // 상위 컴포넌트에서 전달한 속성(반응성 데이터)
    // [ setInterval이 정리 ] 되지 않고, 컴포넌트가 언마운트 될 때까지 계속 실행된다.
    // 따라서 useEffect 안에서 설정했다면, 언마운트 될 때 해제해야한다.
    const timerId = setInterval(() => {
      console.log(new Date().toLocaleTimeString())
    }, 1000)

    // 클린업 함수(설정 함수가 선택적으로 반환하는 함수)
    // : 컴포넌트 언마운트 시 타이머 해제
    return () => clearInterval(timerId)
  }, [year])

  useEffect(() => {
    const handleMouseMove = (e) => {
      console.log({ x: e.clientX, y: e.clientY })
    }

    globalThis.addEventListener('mousemove', handleMouseMove)

    return () => {
      globalThis.removeEventListener('mousemove', handleMouseMove)
    }
  })

  // 렌더링과 관련된 것만 넣어야 하는 공간

  return (
    <div role="group" className="mt-3">
      <label htmlFor="year" className="sr-only">
        년도
      </label>
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        name="year"
        id="year"
        className="input"
      />
    </div>
  )
}
