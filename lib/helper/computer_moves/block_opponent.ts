import { BoardPositions, PlayerSymbol } from "@/hooks/useBoard";

export function block_opponent(
  boardPositions: BoardPositions,
  block: PlayerSymbol
) {
  // helper function
  function check_line(line: BoardPositions[0]) {
    let count = 0;
    for (let i = 0; i < 3; i++) {}
    line.forEach((cell) => {
      if (cell == block) {
        count++;
      }
    });

    return count == 2 ? line.indexOf(null) : -1;
  }

  // Check rows
  for (let i = 0; i < 3; i++) {
    const row = boardPositions[i];
    const col = check_line(row);
    if (col != -1) {
      return { row: i, col };
    }
  }
  // Check columns
  for (let i = 0; i < 3; i++) {
    const column = [
      boardPositions[0][i],
      boardPositions[1][i],
      boardPositions[2][i],
    ];
    const row = check_line(column);
    if (row !== -1) {
      return { row, col: i };
    }
  }

  // Check diagonals
  const mainDiagonal = [
    boardPositions[0][0],
    boardPositions[1][1],
    boardPositions[2][2],
  ];
  const antiDiagonal = [
    boardPositions[0][2],
    boardPositions[1][1],
    boardPositions[2][0],
  ];

  const mainDiagonalIndex = check_line(mainDiagonal);
  if (mainDiagonalIndex !== -1) {
    return { row: mainDiagonalIndex, col: mainDiagonalIndex };
  }

  const antiDiagonalIndex = check_line(antiDiagonal);
  if (antiDiagonalIndex !== -1) {
    return { row: antiDiagonalIndex, col: 2 - antiDiagonalIndex };
  }
  return null;
}
