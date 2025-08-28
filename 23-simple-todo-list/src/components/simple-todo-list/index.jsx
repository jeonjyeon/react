import { useState } from 'react'
import { useImmer } from 'use-immer'
import ToAddForm from '@/components/to-add-form'
import TodoList from '@/components/todo-list'

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
      <ToAddForm
        doit={doit}
        handleChange={handleChange}
        handleClick={handleClick}
      />
      <TodoList
        list={list}
        handleCheckChange={handleCheckChange}
        handleRemoveTodo={handleRemoveTodo}
      />
    </div>
  )
}
