export default function SimpleTodoList() {
  return (
    <div className="container">
      <section>
        <h2 className="sr-only">할 일 추가</h2>
        <form className="new-todo-form">
          <div role="group" className="form-control grow">
            <label htmlFor="todo-input">새로운 할 일</label>
            <input type="text" id="todo-input" />
          </div>
          <button className="button" type="submit">
            추가
          </button>
        </form>
      </section>
      <section>
        <h2 className="sr-only">할 일 목록</h2>
        <ul className="todo-list">
          <li className="list-item">
            <div className="form-control row">
              <input id="todo-item-cisdk" type="checkbox" />
              <label htmlFor="todo-item-cisdk" className="list-item-label">
                할 일 1
              </label>
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}
