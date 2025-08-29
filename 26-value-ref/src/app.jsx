import { Component } from 'react'
import { LearnSection } from '@/components'
import RandomCountUp from '@/demo/app'

export default function App() {
  return (
    <LearnSection title="랜덤 카운트 업" showTitle={false}>
      <ClassComponent />
      <RandomCountUp />
    </LearnSection>
  )
}

class ClassComponent extends Component {
  state = {
    count: 1,
  }

  // 클래스 필드
  // 인스턴스 멤버
  // render 메서드(함수) 외부에 위치
  // 클래스 컴포넌트 내부에 위치
  // 렌더링 될 때마다 값을 기억하고, 변경할 수 있다.
  message = 'Hello React' // 'Hello React'

  render() {
    // this.props

    // render 메서드(함수) 내부의 지역 변수는
    // 렌더링 될 때마다 초기화 (기억할 수 없다)
    // let message = 'Hello React'

    return (
      <section className="p-5 bg-yellow-300 text-black">
        <h2 className="font-extrabold text-xl mb-2">
          클래스 컴포넌트에서의 "값 참조(기억)"
        </h2>
        <p>컴포넌트 렌더링 할 때 마다 이전의 값을 기억할 수 있다.</p>
        <p>렌더링을 유발하지 않는 값을 기억하는 방법 (인스턴스 멤버 사용)</p>
        <button
          type="button"
          className="button block my-2"
          onMouseEnter={() => {
            this.message += '🍀'
            console.log(this.message)
          }}
          onClick={() => {
            this.setState((s) => ({
              ...s,
              count: s.count + 1,
            }))
          }}
        >
          change message ({this.state.count})
        </button>

        <output className="text-xl font-black text-blue-600 uppercase">
          {this.message}
        </output>
      </section>
    )
  }
}
