import { BoardPositions, PlayerSymbol } from "@/hooks/useBoard";

export function create_fork(
  boardPositions: BoardPositions,
  player: PlayerSymbol
) {
  // Helper function to check potential winning lines
  function count_winning_lines(board: BoardPositions, player: PlayerSymbol): number {
    let count = 0;

    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i].filter((cell) => cell === player).length === 2 &&
          board[i].includes(null)) {
        count++;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      const column = [board[0][i], board[1][i], board[2][i]];
      if (column.filter((cell) => cell === player).length === 2 &&
          column.includes(null)) {
        count++;
      }
    }

    // Check diagonals
    const mainDiagonal = [board[0][0], board[1][1], board[2][2]];
    const antiDiagonal = [board[0][2], board[1][1], board[2][0]];

    if (mainDiagonal.filter((cell) => cell === player).length === 2 &&
        mainDiagonal.includes(null)) {
      count++;
    }

    if (antiDiagonal.filter((cell) => cell === player).length === 2 &&
        antiDiagonal.includes(null)) {
      count++;
    }

    return count;
  }

  // Try every empty cell to create a fork
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (boardPositions[row][col] === null) {
        // Clone the board and simulate the move
        const simulatedBoard = boardPositions.map((r) => [...r]);
        simulatedBoard[row][col] = player;

        // Count winning lines after the simulated move
        const winningLines = count_winning_lines(simulatedBoard, player);

        // If the move creates two or more winning lines, it's a fork
        if (winningLines >= 2) {
          return { row, col };
        }
      }
    }
  }

  // No fork possible
  return null;
}
