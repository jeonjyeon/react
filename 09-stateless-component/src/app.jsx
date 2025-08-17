import SvgIcon, {
  Spinner,
  StaticIcon,
} from './components/svg-icon/svg-icon.jsx'

export default function App() {
  return (
    <section>
      <h1>SvgIcon 컴포넌트</h1>
      <div style={{ display: 'flex', gap: 12 }}>
        <SvgIcon type="up-arrow" />
        <SvgIcon type="check-mark" />
        <Spinner />
        <StaticIcon type="cross" />
        <SvgIcon type="not-allowed" />
      </div>
    </section>
  )
}
