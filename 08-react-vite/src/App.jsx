import UserCard from "./components/user-card/user-card";

export default function App() {
  return (
    <section className="app demo">
      <h1>UserCard 커스텀 컴포넌트</h1>
      <UserCard
        id="user-park-ziel"
        name="박주성"
        phoneNumber="010-1234-5678"
        address="강원특별자치도 삼척시 명륜동 12-10"
        age={46}
      />
      <UserCard
        id="user-han-di1k"
        name="한아름"
        phoneNumber="010-5678-1234"
        address="서울특별시 중구 이청동 98-1"
        age={31}
      />
      <UserCard
        id="user-kim-eicj1"
        name="김성한"
        phoneNumber="010-2871-9302"
        address="서울특별시 성북구 미아동 12-5"
        age={22}
      />
    </section>
  );
}
