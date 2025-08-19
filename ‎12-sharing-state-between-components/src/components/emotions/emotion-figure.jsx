import EmotionFace from './emotion-face'
import StatusMessage from './status-message'
import './emotion-figure.css'

export default function EmotionFigure() {
  return (
    <figure className="emotion-figure">
      <EmotionFace />
      <StatusMessage />
    </figure>
  )
}
