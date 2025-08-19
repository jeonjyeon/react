import { useState } from 'react'
import emotions from '@/data/emotions.json'
import './change-button.css'

export default function ChangeButton() {
  const [randomIndex, setRandomIndex] = useState(
    getRandomIndex(emotions.length)
  )

  const handleClick = () => {
    setRandomIndex(getRandomIndex(emotions.length))
  }

  return (
    <button type="button" className="change-button" onClick={handleClick}>
      {emotions[randomIndex].message}
      <img
        src={`/assets/emotions/${emotions[randomIndex].key}.jpg`}
        alt=""
        height={20}
      />
    </button>
  )
}

function getRandomIndex(limit) {
  return Math.floor(Math.random() * limit)
}
