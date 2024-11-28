import { BoardPositions } from "@/hooks/useBoard";

export function occupy_center(
  boardPosition: BoardPositions,
) {
  return boardPosition[1][1] == null ? {row:1,col:1} : null;
}
