import { BoardPositions } from "@/hooks/useBoard";

function random_move(
  boardPositions: BoardPositions,
  difficulty: "hard" | "medium" | "easy"
) {
  let random = false;
  if (difficulty == "hard") {
    random = randomness(10);
  } else if (difficulty == "medium") {
    random = randomness(15);
  } else {
    random = randomness(20);
  }

  if (random) {
    const availablePositions: { row: number; col: number }[] = [];

    // Collect all available (empty) positions
    for (let row = 0; row < boardPositions.length; row++) {
      for (let col = 0; col < boardPositions[row].length; col++) {
        if (!boardPositions[row][col]) {
          availablePositions.push({ row, col });
        }
      }
    }
    const pickMove = Math.round(Math.random() * availablePositions.length);
    return availablePositions[pickMove];
  }

  return null;
}

export function randomness(n: number) {
  const likely = Math.random() * 100; // Generates a number between 0 and 100
  return likely <= n; // true if within the probability range
}

export default random_move;
