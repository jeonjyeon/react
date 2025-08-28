export default function TicTacToe() {
  return (
    <div className="Game">
      <div className="Board">
        <h2 className="Status" role="status">
          다음 플레이어 🟨
        </h2>
        <div
          className="Squares"
          role="grid"
          aria-label="틱택토 게임판"
          aria-rowcount={3}
          aria-colcount={3}
        >
          <button
            role="gridcell"
            aria-rowindex={1}
            aria-colindex={1}
            className="Square"
            aria-label="첫 번째 칸, 🟨"
            disabled
          >
            🟨
          </button>
          <button
            role="gridcell"
            aria-rowindex={1}
            aria-colindex={2}
            className="Square"
            aria-label="두 번째 칸, 비어 있음"
          />
          <button
            role="gridcell"
            aria-rowindex={1}
            aria-colindex={3}
            className="Square"
            aria-label="세 번째 칸, 비어 있음"
          />
          <button
            role="gridcell"
            aria-rowindex={2}
            aria-colindex={1}
            className="Square"
            aria-label="네 번째 칸, 비어 있음"
          />
          <button
            role="gridcell"
            aria-rowindex={2}
            aria-colindex={2}
            className="Square"
            aria-label="다섯 번째 칸, ⚫️"
            disabled
          >
            ⚫️
          </button>
          <button
            role="gridcell"
            aria-rowindex={2}
            aria-colindex={3}
            className="Square"
            aria-label="여섯 번째 칸, 비어 있음"
          />
          <button
            role="gridcell"
            aria-rowindex={3}
            aria-colindex={1}
            className="Square"
            aria-label="일곱 번째 칸, 비어 있음"
          />
          <button
            role="gridcell"
            aria-rowindex={3}
            aria-colindex={2}
            className="Square"
            aria-label="여덟 번째 칸, 비어 있음"
          />
          <button
            role="gridcell"
            aria-rowindex={3}
            aria-colindex={3}
            className="Square"
            aria-label="아홉 번째 칸, 비어 있음"
          />
        </div>
      </div>
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
    </div>
  )
}
