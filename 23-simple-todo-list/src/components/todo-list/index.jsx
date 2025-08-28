import { useState } from 'react'
import { useImmer } from 'use-immer'
import TodoItem from '@/components/todo-item'

export default function SimpleTodoList() {
  const [doit, setDoit] = useState('')
  const handleChange = (e) => setDoit(e.target.value)

  const [list, setList] = useImmer([
    { id: crypto.randomUUID(), doit: '보육원에 가서 점심 사주기', done: false },
  ])

  // 새로운 todo를 list에 추가
  const handleClick = (e) => {
    e.preventDefault()

    if (!doit) return

    setList((draft) => {
      draft.push({ id: crypto.randomUUID(), doit, done: false })
    })

    setDoit('')
  }

  // todo의 완료 상태를 변경
  const handleCheckChange = (id) => {
    setList((draft) => {
      const todo = draft.find((item) => item.id === id)
      if (todo) {
        todo.done = !todo.done
      }
    })
  }

  const handleRemoveTodo = (id) => {
    setList(
      (draft) =>
        // const index = draft.findIndex((item) => item.id === id)
        // if (index !== -1) {
        //   draft.splice(index, 1)
        // }
        (draft = draft.filter((item) => item.id !== id))
    )
  }

  return (
    <div className="container">
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
    </div>
  )
}
