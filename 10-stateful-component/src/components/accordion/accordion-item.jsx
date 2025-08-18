import DownArrowIcon from './cevron.jsx'
import './style.css'

/**
 * AccordionItem 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {number} props.index - 질문/답변의 인덱스
 * @param {string} props.question - 질문 텍스트
 * @param {string} props.answer - 답변 텍스트
 * @param {boolean} props.isOpen - 아코디언 아이템 열림/닫힘 여부
 * @param {(nextActiveIndex: number) => void} props.onActive - 아코디언 아이템 열리도록 설정하는 기능
 */
export default function AccordionItem({
  index,
  question,
  answer,
  isOpen = false,
  onActive,
}) {
  // const buttonLabel = isOpen ? '닫힘' : '열림'
  let flipped = false
  isOpen ? (flipped = false) : (flipped = true)

  return (
    <div className="accordion-item">
      <dd>
        <button
          className="accordion-question"
          type="button"
          onClick={() => onActive?.(index)}
        >
          {question}
          <DownArrowIcon flipped={flipped} />
        </button>
      </dd>
      <dd className="accordion-answer" hidden={!isOpen}>
        {answer}
      </dd>
    </div>
  )
}
