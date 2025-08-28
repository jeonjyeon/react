import { LearnSection } from '@/components'
import UserProfileTable from './components/user-profile-table'

export default function App() {
  return (
    <LearnSection title="사용자 프로필 테이블 실습" showTitle={false}>
      <UserProfileTable />
    </LearnSection>
  )
}
