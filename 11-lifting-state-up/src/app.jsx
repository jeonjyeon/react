import { useState } from 'react'
import { LearnSection } from '@/components'
import LiftingStateUpDemo from './components/lifting-state-up'

export default function App() {
  return (
    <LearnSection title="상태 끌어올리기" showTitle={false}>
      <LiftingStateUpDemo />
    </LearnSection>
  )
}
