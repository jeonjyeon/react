export default function TodoItem({
  id,
  done,
  doit,
  handleCheckChange,
  handleRemoveTodo,
}) {
  return (
    <li key={id} className="list-item">
      <div className="form-control row">
        <input
          id={`todo-item-${id}`}
          type="checkbox"
          checked={done}
          onChange={() => handleCheckChange(id)}
        />
        <label
          htmlFor={`todo-item-${id}`}
          className={done ? 'list-item-label completed' : 'list-item-label'}
        >
          {doit}
        </label>
      </div>
      <button
        type="button"
        className="button"
        onClick={() => handleRemoveTodo(id)}
      >
        삭제
      </button>
    </li>
  )
}
