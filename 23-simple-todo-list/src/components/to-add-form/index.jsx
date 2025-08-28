export default function ToAddForm({ doit, handleChange, handleClick }) {
  return (
    <section>
      <h2 className="sr-only">할 일 추가</h2>
      <form className="new-todo-form">
        <div role="group" className="form-control grow">
          <label htmlFor="todo-input">새로운 할 일</label>
          <input
            type="text"
            id="todo-input"
            value={doit}
            onChange={handleChange}
          />
        </div>
        <button className="button" type="submit" onClick={handleClick}>
          추가
        </button>
      </form>
    </section>
  )
}
