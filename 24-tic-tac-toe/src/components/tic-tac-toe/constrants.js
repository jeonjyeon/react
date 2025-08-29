export const GRID = {
  ROWS: 3,
  COLS: 3,
}

export const PLAYER = {
  ONE: '⚫️',
  TWO: '🟨',
}

export const getPlayerName = (player) => {
  if (!player) return '비어 있음'
  return player === PLAYER.ONE ? '플레이어 1' : '플레이어 2'
}

export const INITIAL_SQUARES = Array(9).fill(null) // [null] x 9
