import users from './data/user.json'
import UserCard from './components/user-card/user-card'

export default function App() {
  console.log(users)
  const [user1, user2, user3] = users

  return (
    <section className="app demo">
      <h1>UserCard 커스텀 컴포넌트</h1>
      <UserCard
        id={user1.id}
        name={user1.name}
        phoneNumber={user1.phoneNumber}
        address={user1.address}
        age={user1.age}
      />
      <UserCard
        id={user2.id}
        name={user2.name}
        phoneNumber={user2.phoneNumber}
        address={user2.address}
        age={user2.age}
      />
      <UserCard
        id={user3.id}
        name={user3.name}
        phoneNumber={user3.phoneNumber}
        address={user3.address}
        age={user3.age}
      />
    </section>
  )
}
