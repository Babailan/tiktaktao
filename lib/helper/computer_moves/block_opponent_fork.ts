import { BoardPositions, PlayerSymbol } from "@/hooks/useBoard";

export function block_opponent_fork(
  boardPositions: BoardPositions,
  opponent: PlayerSymbol,
  player: PlayerSymbol
) {
  // Helper function to count how many of a player's symbols are in a line
  function count_line(line: BoardPositions[0]): {
    player: number;
    opponent: number;
    empty: number;
  } {
    const counts = { player: 0, opponent: 0, empty: 0 };
    line.forEach((cell) => {
      if (cell === player) counts.player++;
      else if (cell === opponent) counts.opponent++;
      else counts.empty++;
    });
    return counts;
  }

  // Check for potential forks and block them
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (boardPositions[row][col] === null) {
        // Simulate opponent's move in this empty cell
        const simulatedBoard = boardPositions.map((r) => [...r]);
        simulatedBoard[row][col] = opponent;

        // Check how many winning opportunities the opponent creates
        let forkOpportunities = 0;

        // Check rows
        for (let i = 0; i < 3; i++) {
          const lineCounts = count_line(simulatedBoard[i]);
          if (lineCounts.opponent === 2 && lineCounts.empty === 1) {
            forkOpportunities++;
          }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
          const column = [
            simulatedBoard[0][i],
            simulatedBoard[1][i],
            simulatedBoard[2][i],
          ];
          const lineCounts = count_line(column);
          if (lineCounts.opponent === 2 && lineCounts.empty === 1) {
            forkOpportunities++;
          }
        }

        // Check diagonals
        const mainDiagonal = [
          simulatedBoard[0][0],
          simulatedBoard[1][1],
          simulatedBoard[2][2],
        ];
        const antiDiagonal = [
          simulatedBoard[0][2],
          simulatedBoard[1][1],
          simulatedBoard[2][0],
        ];

        const mainDiagonalCounts = count_line(mainDiagonal);
        const antiDiagonalCounts = count_line(antiDiagonal);

        if (
          mainDiagonalCounts.opponent === 2 &&
          mainDiagonalCounts.empty === 1
        ) {
          forkOpportunities++;
        }
        if (
          antiDiagonalCounts.opponent === 2 &&
          antiDiagonalCounts.empty === 1
        ) {
          forkOpportunities++;
        }

        // If the opponent creates a fork, block it
        if (forkOpportunities >= 2) {
          return { row, col };
        }
      }
    }
  }

  // No fork to block
  return null;
}
