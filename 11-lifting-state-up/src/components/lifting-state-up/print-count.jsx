import './print-count.css'

// Stateless
export default function PrintCount(props) {
  console.log('PrintCount 렌더링')

  // 현재 count 값을 출력함.
  // 부모(App)에서 내려받은 값을 그대로 보여줌.
  return (
    <output className="print-count" style={{ padding: 12 }}>
      {props.count}
    </output>
  )
}
