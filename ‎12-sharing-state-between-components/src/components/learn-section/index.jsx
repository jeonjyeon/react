import './style.css'

export default function LearnSection({ title, hiddenTitle = true, children }) {
  const classNames = hiddenTitle ? 'sr-only' : null

  return (
    <section className="learn-section">
      <h1 className={classNames}>{title}</h1>
      {children}
    </section>
  )
}
