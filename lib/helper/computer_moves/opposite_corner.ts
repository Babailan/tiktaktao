import { BoardPositions, PlayerSymbol } from "@/hooks/useBoard";

export function opposite_corner(
  boardPositions: BoardPositions,
  player: PlayerSymbol
) {
  // Map of corners and their opposites
  const oppositeCornersPair = [
    [
      [0, 0], // top left-> bottom right
      [2, 2],
    ],
    [
      [0, 2], // top right -> bottom left
      [2, 0],
    ],
    [
      [2, 0], // bottom left -> top right
      [0, 2],
    ],
    [
      [2, 2],
      [0, 0], // bottom right -> top left
    ],
  ];
  for (let i = 0;i < oppositeCornersPair.length; i++) {
    const facing = oppositeCornersPair[i][0];
    const oppositeCell = oppositeCornersPair[i][1];
    if (
      boardPositions[facing[0]][facing[1]] == player &&
      boardPositions[oppositeCell[0]][oppositeCell[1]] == null
    ) {
      return { row: oppositeCell[0], col: oppositeCell[1] };
    }
  }

  // No valid opposite corner found
  return null;
}
