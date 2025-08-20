import { LearnSection } from '@/components'
import ShoppingCart from '@/components/shopping-cart'

export default function App() {
  return (
    <LearnSection title="장바구니" showTitle={false}>
      <ShoppingCart />
    </LearnSection>
  )
}
