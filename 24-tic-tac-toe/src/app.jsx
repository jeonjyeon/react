import { LearnSection } from '@/components'
import TicTacToe from '@/components/tic-tac-toe'

export default function App() {
  return (
    <LearnSection title="틱택토(TicTacToe)" showTitle={false}>
      <TicTacToe />
    </LearnSection>
  )
}
