import accordionData from './data.json'
import { Component } from 'react'
import AccordionItem from './accordion-item'
import './style.css'

export default class AccordionList extends Component {
  // 상태 선언
  // 클래스 필드 구문 활용
  state = {
    activeIndex: 0,
  }

  // 이벤트 핸들러
  handleActiveIndex = (nextActiveIndex) => {
    // 상태 업데이트
    this.setState({ activeIndex: nextActiveIndex }, () => {
      console.log(this.state.activeIndex)
    })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <div className="accordion">
        <h2>자주 묻는 질문</h2>
        <dl>
          {accordionData.map((item, index) => (
            <AccordionItem
              index={index}
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={activeIndex == index}
              onActive={this.handleActiveIndex}
            />
          ))}
        </dl>
      </div>
    )
  }
}
