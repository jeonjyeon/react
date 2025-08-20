import { LearnSection } from '@/components'
import ManageArrayState from '@/components/manage-array-state'
import ManageArrayStateWithImmer from '@/components/manage-array-state/index-with-immer'

export default function App() {
  return (
    <LearnSection title="React" showTitle={false}>
      <ManageArrayStateWithImmer />
      <hr />
      <ManageArrayState />
    </LearnSection>
  )
}
