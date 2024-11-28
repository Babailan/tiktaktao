import { BoardPositions } from "@/hooks/useBoard";

// Function for "Empty Corner" strategy
export function empty_corner(board: BoardPositions) {
  const corners = [
    [0, 0],
    [0, 2], // Top-left, Top-right
    [2, 0],
    [2, 2], // Bottom-left, Bottom-right
  ];

  for (const [row, col] of corners) {
    if (board[row][col] === null) {
      return { row, col }; // Return the position played
    }
  }

  return null; // No corners available
}
