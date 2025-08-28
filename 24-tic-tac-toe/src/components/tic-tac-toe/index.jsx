import { useState } from 'react'
import { GRID, INITIAL_SQUARES, PLAYER } from './constrants.js'

export default function TicTacToe() {
  return (
    <div className="Game">
      <Board />
      <History />
    </div>
  )
}

function Board() {
  const [player, setPlayer] = useState(PLAYER.ONE)
  return (
    <div className="Board">
      <Status player={player} />
      <Squares player={player} setPlayer={setPlayer} />
    </div>
  )
}

function Status({ player }) {
  return (
    <h2 className="Status" role="status">
      다음 플레이어 {player}
    </h2>
  )
}

function Squares({ player, setPlayer }) {
  // 게임 상태 설정
  // 게임 보드를 구성하는 사각형을 관리하는 상태
  const [squares, setSquares] = useState(INITIAL_SQUARES)

  // 게임 진행 순서 상태
  const [gameIndex, setGameIndex] = useState(0)
  console.log(gameIndex % 2)

  // 부수 효과
  // - 이벤트 핸들러 (handle*)
  // - 이벤트 훅 (useEffect)
  const playGame = (squareIndex, e) => {
    // 접근성 (리액트 처리 못함)
    if (e.target.getAttribute('aria-disabled') === 'true') {
      return
    }

    // 사용자가 게임을 진행하면 인덱스가 변경
    const nextGameIndex = gameIndex + 1
    setGameIndex(nextGameIndex)

    // 리액트의 불변성을 해치는 코드!
    // squares[squareIndex] = player

    // 리액트의 불변성을 지키는 코드!
    const nextSquares = squares.map((square, index) => {
      if (index === squareIndex) {
        return player
      }
      return square
    })

    setSquares(nextSquares)

    setPlayer(player === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE)
  }

  return (
    <div
      className="Squares"
      role="grid"
      aria-label="틱택토 게임판"
      aria-rowcount={GRID.ROWS}
      aria-colcount={GRID.COLS}
    >
      {squares.map((square, index) => {
        return (
          <SquareButton key={index} index={index} onPlay={playGame}>
            {square}
          </SquareButton>
        )
      })}
    </div>
  )
}

function SquareButton({ children, index, onPlay }) {
  const isEmpty = !children
  const isDisabled = !isEmpty
  const label = `${index + 1}번째 칸, ${isEmpty ? '비어 있음' : children}`

  return (
    <button
      role="gridcell"
      aria-rowindex={Math.floor(index / GRID.ROWS) + 1}
      aria-colindex={(index % GRID.COLS) + 1}
      className="Square"
      aria-label={label}
      disabled={isDisabled}
      onClick={(e) => onPlay(index, e)}
    >
      {children}
    </button>
  )
}

// --------------------------------------------------------------------------
function History() {
  return (
    <div className="History">
      <ol className="HistoryList">
        <li className="HistoryListItem">
          <button type="button" className="HistoryButton">
            게임 시작!
          </button>
        </li>
        <li className="HistoryListItem">
          <button
            type="button"
            className="HistoryButton"
            aria-label="게임 #1 이동"
          >
            게임 #1
          </button>
        </li>
        <li className="HistoryListItem">
          <button
            type="button"
            className="HistoryButton"
            aria-label="게임 #2 이동"
            disabled
          >
            게임 #2
          </button>
        </li>
      </ol>
    </div>
  )
}
