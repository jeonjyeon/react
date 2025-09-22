import './user-card.css'

// props 컴포넌트 속성
// - name: string '박주성'
// - phoneNumber: string '010-1234-5678'
// - age: number 46
// - address: string '강원특별자치도 태백시 ...'

export default function UserCard(props) {
  console.log(props)

  return (
    <article className="user-card" aria-labelledby="user-han-di1k">
      <h2 id="user-han-di1k" className="user-name">
        {props.name}
      </h2>
      <dl className="user-info">
        <div>
          <dt>나이</dt>
          <dd>{props.age}세</dd>
        </div>
        <div>
          <dt>전화번호</dt>
          <dd>{props.phoneNumber}</dd>
        </div>
        <div>
          <dt>주소</dt>
          <dd>{props.address}</dd>
        </div>
      </dl>
    </article>
  )
}
