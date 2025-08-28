import { useState } from 'react'

export default function TicTacToe() {
  return (
    <div className="Game">
      <Board />
      <History />
    </div>
  )
}

// 게임 상수
const PLAYER = {
  ONE: '⚫️',
  TWO: '🟨',
}

const INITIAL_SQUARES = Array(9).fill(null)

function Board() {
  return (
    <div className="Board">
      <Status />
      <Squares />
    </div>
  )
}

function Status() {
  return (
    <h2 className="Status" role="status">
      다음 플레이어 🟨
    </h2>
  )
}

function Squares() {
  const squares = [...INITIAL_SQUARES]

  return (
    <div
      className="Squares"
      role="grid"
      aria-label="틱택토 게임판"
      aria-rowcount={3}
      aria-colcount={3}
    >
      {squares.map((square, index) => {
        return <SquareButton key={index}>{index}</SquareButton>
      })}
    </div>
  )
}

function SquareButton({ children }) {
  return (
    <button
      role="gridcell"
      aria-rowindex={1}
      aria-colindex={1}
      className="Square"
      aria-label="첫 번째 칸, 비어 있음"
      disabled={false}
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
