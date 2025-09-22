import accordionData from './data.json'
import { Component, useState } from 'react'
import { AccordionItemClass, AccordionItemFunction } from './accordion-item'
import './accordion-list.css'

export class AccordionListClass extends Component {
  // 상태 선언
  // 클래스 필드 구문 활용
  state = {
    activeIndex: null,
  }

  // 이벤트 핸들러
  handleActiveIndex = (nextActiveIndex) => {
    // 상태 업데이트
    this.setState({ activeIndex: nextActiveIndex }, () => {
      console.log(this.state.activeIndex)
    })
  }

  // /**
  //  * 아코디언 아이템 클릭 시 실행되는 핸들러
  //  * 부모(AccordionList)가 자식(AccordionItem)에게 핸들러(onActive)를 전달하고,
  //  * 자식이 자신의 index를 인자로 넘겨 호출함
  //  * @param {number} nextActiveIndex - 클릭된 아이템의 인덱스 값
  //  * @param {object} props
  //  * @param {boolean} props.onlyOneOpen - true일 경우 하나의 아코디언 아이템만 열 수 있음
  //  * @description
  //  * - 같은 인덱스를 다시 클릭하면 닫힘(null)
  //  * - 다른 인덱스를 클릭하면 해당 인덱스로 열림
  //  * - prevState는 상태 변경 직전의 state 값
  //  */
  // handleActiveIndex = (nextActiveIndex) => {
  //   // 상태 업데이트
  //   this.setState((prevState) => ({
  //     // 같은 인덱스가 클릭되면 아코디언 아이템 닫힘 처리
  //     activeIndex:
  //       prevState.activeIndex === nextActiveIndex ? null : nextActiveIndex,
  //   }))
  // }

  render() {
    const { onlyOneOpen = false } = this.props
    const { activeIndex } = this.state

    return (
      <div className="accordion">
        <h2>자주 묻는 질문</h2>
        <dl>
          {accordionData.map((item, index) => (
            <AccordionItemClass
              index={index}
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={activeIndex == index}
              onActive={this.handleActiveIndex}
              onlyOneOpen={onlyOneOpen}
            />
          ))}
        </dl>
      </div>
    )
  }
}

export function AccordionListFunction({ onlyOneOpen = false }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const handleActiveIndex = (nextActiveIndex) => setActiveIndex(nextActiveIndex)

  return (
    <div className="accordion">
      <h2>자주 묻는 질문</h2>
      <dl>
        {accordionData.map((item, index) => (
          <AccordionItemFunction
            index={index}
            key={item.id}
            question={item.question}
            answer={item.answer}
            isOpen={activeIndex == index}
            onActive={handleActiveIndex}
            onlyOneOpen={onlyOneOpen}
          />
        ))}
      </dl>
    </div>
  )
}
