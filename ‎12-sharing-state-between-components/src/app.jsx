import { ChangeButton, EmotionFigure } from './components/emotions'
import LearnSection from './components/learn-section'

export default function App() {
  return (
    <LearnSection title="리액트 컴포넌트 상태 공유 학습">
      <EmotionFigure />
      <ChangeButton />
    </LearnSection>
  )
}
