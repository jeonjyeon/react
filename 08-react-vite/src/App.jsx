import users from './data/users.json'
import { UserCard, UserCardClass } from './components/user-card/index.js'

export default function App() {
  console.log(users)
  // const [user1, user2, user3] = users

  return (
    <section className="app demo">
      <h1>UserCard 커스텀 컴포넌트</h1>
      {users.map((user) => (
        <UserCardClass
          key={user.id}
          id={user.id}
          name={user.name}
          phoneNumber={user.phoneNumber}
          address={user.address}
          age={user.age}
        />
      ))}
    </section>
  )
}
