import { BoardPositions, PlayerSymbol, Winner } from "@/hooks/useBoard";

// Check if a player has won or if the game is a draw
export function check_win(
  board: BoardPositions
): Winner {
  // Define possible players
  const players: PlayerSymbol[] = ["x", "o"];

  for (const player of players) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === player &&
        board[i][1] === player &&
        board[i][2] === player
      ) {
        const indexes = [
          [i, 0],
          [i, 1],
          [i, 2],
        ];
        return { winner: player, indexes };
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === player &&
        board[1][i] === player &&
        board[2][i] === player
      ) {
        const indexes = [
          [0, i],
          [1, i],
          [2, i],
        ];
        return { winner: player, indexes };
      }
    }

    // Check main diagonal
    if (
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player
    ) {
      const indexes = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
      return { winner: player, indexes };
    }

    // Check anti-diagonal
    if (
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player
    ) {
      const indexes = [
        [0, 2],
        [1, 1],
        [2, 0],
      ];
      return { winner: player, indexes };
    }
  }

  // Check for a draw
  const isDraw = board.every((row) => row.every((cell) => cell !== null));
  if (isDraw) {
    console.log("draw")
    return { winner: "draw" };
  }

  // If no winner and no draw, return null
  return null;
}
