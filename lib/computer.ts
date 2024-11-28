import { BoardPositions, PlayerSymbol } from "@/hooks/useBoard";
import { block_opponent } from "./helper/computer_moves/block_opponent";
import { create_fork } from "./helper/computer_moves/create_fork";
import { immediate_win } from "./helper/computer_moves/immediate_win";
import { occupy_center } from "./helper/computer_moves/occupy_center";
import { opposite_corner } from "./helper/computer_moves/opposite_corner";
import { block_opponent_fork } from "./helper/computer_moves/block_opponent_fork";
import { empty_corner } from "./helper/computer_moves/empty_corner";
import { empty_side } from "./helper/computer_moves/empty_side";
import random_move from "./helper/computer_moves/random_move";

export function playBotMove(
  boardPositions: BoardPositions,
  bot: PlayerSymbol,
  difficulty: "easy" | "medium" | "hard" ,
) {
  const player = bot === "x" ? "o" : "x";
  let algorithm;

  const strategies: Record<string, (() => void)[]> = {
    easy: [
      () => empty_corner(boardPositions),
      () => empty_side(boardPositions),
    ],
    medium: [
      () => immediate_win(boardPositions, bot),
      () => block_opponent(boardPositions, player),
      () => occupy_center(boardPositions),
      () => empty_corner(boardPositions),
      () => empty_side(boardPositions),
    ],
    hard: [
      () => immediate_win(boardPositions, bot),
      () => block_opponent(boardPositions, player),
      () => create_fork(boardPositions, bot),
      () => block_opponent_fork(boardPositions, bot, player),
      () => occupy_center(boardPositions),
      () => opposite_corner(boardPositions, player),
      () => empty_corner(boardPositions),
      () => empty_side(boardPositions),
    ],
  };

  const botStrategies = strategies[difficulty];

  // Process each strategy in order
  for (const strategy of botStrategies) {
    algorithm = random_move(boardPositions,difficulty) || strategy();
    if (algorithm) {
      return {row:algorithm.row,col:algorithm.col};
    }
  }
  return null
}
