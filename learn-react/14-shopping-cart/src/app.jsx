import { LearnSection } from '@/components'
import { ShoppingCart, ShoppingCartClass } from '@/components/shopping-cart'

export default function App() {
  return (
    <LearnSection title="장바구니" showTitle={false}>
      <ShoppingCartClass />
      <ShoppingCart />
    </LearnSection>
  )
}
