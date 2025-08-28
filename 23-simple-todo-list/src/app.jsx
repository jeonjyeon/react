import { LearnSection } from '@/components'
import SimpleTodoList from './components/simple-todo-list'

export default function App() {
  return (
    <LearnSection title="심플 투두리스트" showTitle={false}>
      <SimpleTodoList />
    </LearnSection>
  )
}
