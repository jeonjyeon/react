import { LearnSection } from '@/components'
import ManageArrayState from '@/components/manage-array-state'

export default function App() {
  return (
    <LearnSection title="React" showTitle={false}>
      <ManageArrayState />
    </LearnSection>
  )
}
