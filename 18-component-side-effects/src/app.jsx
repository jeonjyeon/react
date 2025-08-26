import { useEffect, useId, useState } from 'react'
import { LearnSection } from '@/components'
import { tw } from './utils'

export default function App() {
  // const [width, setWidth] = useState(globalThis.innerWidth)
  // const [height, setHeight] = useState(globalThis.innerHeight)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      // React 18+
      // Batch Update (한번에 여러 상태 업데이트 처리)
      // setWidth(globalThis.innerWidth)
      // setHeight(globalThis.innerHeight)

      setDimension({
        width: globalThis.innerWidth,
        height: globalThis.innerHeight,
      })
    }

    globalThis.addEventListener('resize', handleResize)

    // 마운트 이후, 리사이즈 실행 (상태 업데이트 -> 화면 변경)
    handleResize()

    return () => {
      globalThis.removeEventListener('resize', handleResize)
    }
  }, [])

  const { width, height } = dimension

  return (
    <LearnSection title="추가 실습" showTitle>
      <output
        className={tw(
          'block',
          'max-w-4xl mx-auto mt-5 p-3',
          'rounded-xl',
          'bg-black text-amber-500',
          'text-2xl text-center'
        )}
      >
        {width} x {height}
      </output>
      <p className="mt-3">
        뷰포트 크기를 조정할 때마다 너비(width)와 높이(height) 정보를 화면에
        출력하는 이펙트를 추가합니다.
      </p>
    </LearnSection>
  )
}

// -----------------------------------------------

function UseEffectPractice() {
  // 클래스 컴포넌트의 "자주 사용되는 라이프사이클 메서드" 실습을 이펙트 훅으로 재현

  // - 마운트 감지 : 컴포넌트가 마운트될 때 "마운트" 출력
  useEffect(() => {
    console.log('마운트')
  }, [])

  // - 렌더링 추적 : 컴포넌트가 리렌더링될 때마다 "렌더링" 출력
  console.log('렌더링')

  // - 상태 업데이트 감지 : 상태가 변경될 때마다 "변경된 상태 값" 출력
  const [title, setTitle] = useState('실습')

  // - 문서 제목 업데이트 : 상태가 변경될 때마다 문서의 제목 값을 동적으로 변경
  useEffect(() => {
    document.title = title
  }, [title])

  // - 라이프사이클 클린업 : 설정된 이벤트 리스닝 또는 타이머 등 정리(cleanup)
  const [isShown, setIsShown] = useState(false)
  const checkboxId = useId()

  return (
    <LearnSection
      title={title}
      showTitle
      className="p-10 flex flex-col gap-4 text-indigo-600"
    >
      <button
        type="button"
        className="button "
        onClick={() => setTitle((t) => t + '!')}
      >
        상태 변경
      </button>
      <div role="group">
        <input
          type="checkbox"
          id={checkboxId}
          checked={isShown}
          onChange={(e) => setIsShown(e.target.checked)}
        />
        <label htmlFor={checkboxId}>Paragraph 마운트/언마운트</label>
      </div>
      {isShown && <Paragraph />}
    </LearnSection>
  )
}

function Paragraph() {
  useEffect(() => {
    console.log('Paragraph 마운트')

    // 이벤트 리스너 추가
    const handleClick = () => {
      console.log('문서 클릭')
    }

    console.log('Paragraph 이펙트 함수 실행됨')
    document.addEventListener('click', handleClick)

    const timerId = setInterval(() => {
      console.count('count')
    }, 1000)

    // - 라이프사이클 클린업 : 설정된 이벤트 리스닝 또는 타이머 등 정리(cleanup)
    return () => {
      document.removeEventListener('click', handleClick)
      clearInterval(timerId)
      console.log('Paragraph 언마운트')
    }
  }, [])

  return <p>예시 단락 예시 단락</p>
}

// -----------------------------------------------

// 1. 생성 (상태 초기화 : 지연된...)
const getInitialCount = () => {
  console.time('지연된 초기화')
  const now = performance.now()
  while (now > performance.now() - 4000) {
    // 지연 처리 시뮬레이션
  }
  console.timeEnd('지연된 초기화')
  return 1
}

function EffectLifecycleDemo() {
  const [count, setCount] = useState(getInitialCount)

  useEffect(
    () => {
      /* setup */
      // 3. 마운트 이후, 이펙트 함수 설정
      // 6. 리렌더링 이후, (정리 이후에) 다시 이펙트 함수 설정
      console.log(
        '브라우저 환경(외부 시스템) 이벤트 리스너 연결: 이펙트 함수 실행됨'
      )

      // 5. 클린업 함수 실행
      //   마운트 시점이 아닌, 리렌더링 시점에 이펙트 함수보다 먼저 실행
      return () => {
        console.log('이벤트 리스너 해제: 클린업 함수 실행됨')
      }
    }
    // Dependency array
    // []
  )

  // 2. 컴포넌트 렌더링 -> 리액트 엘리먼트(JSX) 반환
  // 4. 컴포넌트 리렌더링 -> 리액트 엘리먼트(JSX) 반환 (변경된 상태 값을 화면에 반영)
  console.log('컴포넌트 렌더링')
  return (
    <LearnSection title="훅의 실행 흐름" showTitle>
      <button
        type="button"
        className="button my-2 px-4 text-4xl"
        onClick={() => setCount(count + 10)}
      >
        {count} {/* 1, 11, 21 ... */}
      </button>
    </LearnSection>
  )
}

// -----------------------------------------------

function ReferenceIdentityDemo() {
  const [count, setCount] = useState(1)

  useEffect(() => {
    const clearId = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)

    return () => clearInterval(clearId)
  }, [])

  // 객체를 넘겨줄 때는 구성이 같아도, 리렌더링되면 참조가 달라지기 때문에
  // 새로 만들어진 객체는 이전 객체와 다른 것으로 간주한다.
  // 따라서 매번 새로운 배열을 생성하게 된다.
  const numbers = [1, 2, 3]

  return (
    <LearnSection title={'참조 동일성 (객체형 vs. 기본형)' + count} showTitle>
      <ObjectDependency numbers={numbers} />
    </LearnSection>
  )
}

function ObjectDependency({ numbers }) {
  // console.log('ObjectDependency 렌더링')

  const [count, setCount] = useState(0)

  // 렌더링 될 때마다 배열 객체를 매번 새로 생성
  // 구성이 동일해도 매번 새 배열 생성되어 다른 것으로 간주
  // 근데 숫자, 문자열 같은 기본값은 참조되는 것이 아니라 값 자체가 비교되기 때문에
  // 때문에 매번 새로운 값을 생성하지 않으면 리렌더링이 발생하지 않는다.
  // const numbers = [1, 2, 3]

  useEffect(() => {
    // console.log(numbers.join(','), 'numbers가 변경되어 실행됨')
    // }, [numbers])
    console.log('numbers 항목 갯수는 ' + numbers.length + '개')
  }, [numbers.length])

  const handleCountUp = () => setCount(count + 1)

  return (
    <button
      type="button"
      className="button my-2 px-4 text-4xl"
      onClick={handleCountUp}
    >
      {count}
    </button>
  )
}

// -----------------------------------------------
// 컴포넌트 렌더링 (상태 관리)
// 사이드 이펙트 (부수 효과 : 외부 시스템에서 데이터 가져오기 : 항상 실행 (종속성 없음))
// 컴포넌트와 외부 시스템 동기화 (부수 효과에서 상태 업데이트)
function AppDemo() {
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
