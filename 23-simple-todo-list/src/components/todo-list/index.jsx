import TodoItem from '@/components/todo-item'

export default function TodoList({
  list,
  handleCheckChange,
  handleRemoveTodo,
}) {
  return (
    <section>
      <h2 className="sr-only">할 일 목록</h2>
      <ul className="todo-list">
        {list.map(({ id, doit, done }) => {
          return (
            <TodoItem
              key={id}
              id={id}
              doit={doit}
              done={done}
              handleCheckChange={handleCheckChange}
              handleRemoveTodo={handleRemoveTodo}
            />
          )
        })}
      </ul>
    </section>
  )
}
