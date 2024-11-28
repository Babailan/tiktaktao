import { BoardPositions, BoardCell } from "@/hooks/useBoard";

export function immediate_win(
  boardPositions: BoardPositions,
  target: BoardCell
) {
  // Helper function to find the winning move in a line
  function check_line(line: BoardPositions[0], target: BoardCell) {
    let countComputer = 0;
    let emptyIndex = -1;

    for (let i = 0; i < 3; i++) {
      if (line[i] === target) {
        countComputer++;
      } else if (line[i] === null) {
        emptyIndex = i;
      }
    }

    // If two marks and one empty, return the empty index
    return countComputer === 2 && emptyIndex !== -1 ? emptyIndex : -1;
  }

  // Check rows for an immediate win
  for (let row = 0; row < 3; row++) {
    const emptyCol = check_line(boardPositions[row], target);
    if (emptyCol !== -1) {
      return { row, col: emptyCol }; // Winning move found
    }
  }

  // Check columns for an immediate win
  for (let col = 0; col < 3; col++) {
    const column = [
      boardPositions[0][col],
      boardPositions[1][col],
      boardPositions[2][col],
    ];
    const emptyRow = check_line(column, target);
    if (emptyRow !== -1) {
      return { row: emptyRow, col }; // Winning move found
    }
  }

  // Check main diagonal (top-left to bottom-right)
  const mainDiagonal = [
    boardPositions[0][0],
    boardPositions[1][1],
    boardPositions[2][2],
  ];
  const emptyIndexMain = check_line(mainDiagonal, target);
  if (emptyIndexMain !== -1) {
    return { row: emptyIndexMain, col: emptyIndexMain };
  }

  // Check anti-diagonal (top-right to bottom-left)
  const antiDiagonal = [
    boardPositions[0][2],
    boardPositions[1][1],
    boardPositions[2][0],
  ];
  const emptyIndexAnti = check_line(antiDiagonal, target);
  if (emptyIndexAnti !== -1) {
    return { row: emptyIndexAnti, col: 2 - emptyIndexAnti };
  }

  // No immediate win move found
  return null;
}
