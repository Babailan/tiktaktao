import { BoardPositions } from "@/hooks/useBoard";

// Function for "Empty Side" strategy
export function empty_side(board: BoardPositions) {
  const sides = [
    [0, 1],
    [1, 0], // Top-middle, Middle-left
    [1, 2],
    [2, 1], // Middle-right, Bottom-middle
  ];

  for (const [row, col] of sides) {
    if (board[row][col] === null) {
      return {row, col}; // Return the position played
    }
  }

  return null; // No sides available
}
