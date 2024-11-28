"use client";

import { playBotMove } from "@/lib/computer";
import { check_win } from "@/lib/helper/computer_moves/check_win";
import { randomness } from "@/lib/helper/computer_moves/random_move";
import { useEffect, useState } from "react";
import sleep from "sleep-promise";
import {
  useLocalStorage,
  useReadLocalStorage,
  useSessionStorage,
} from "usehooks-ts";
export type BoardCell = "x" | "o" | null;
export type PlayerSymbol = "x" | "o";
export type BoardPositions = BoardCell[][];
export type Winner = null | {
  winner: PlayerSymbol | "draw";
  indexes?: number[][];
};
/**
 * @description Disable the ssr if you wanna use this because i usd Audio API which is not on ssr ;).
 * @returns returns the states of board :3.
 */

type config = {
  player: PlayerSymbol;
};

export function useBoard({ player }: config) {
  const moveAudio =
    typeof window === "undefined" ? undefined : new Audio("/audio/move.mp3");
  const difficulty =
    useReadLocalStorage<Parameters<typeof playBotMove>[2]>("difficulty");
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [tieScore, setTieScore] = useLocalStorage("tieScore", 0);
  const [playerScore, setPlayerScore] = useLocalStorage("playerScore", 0);
  const [botScore, setBotScore] = useLocalStorage("botScore", 0);

  // Initial States
  const [boardState, setBoardState] = useState<{
    win: Winner;
    boardPositions: BoardPositions;
    bot: PlayerSymbol;
    turn: PlayerSymbol;
  }>({
    win: null,
    boardPositions: Array(3).fill(Array(3).fill(null)),
    bot: player == "x" ? "o" : "x",
    turn: "o",
  });
  // Reset the board
  function resetBoardPositions() {
    setBoardState((p) => ({
      ...p,
      boardPositions: Array(3).fill(Array(3).fill(null)),
      turn: randomness(50) ? "x" : "o",
      win: null,
    }));
  }

  async function setPosition(position: [number, number]) {
    const [row, col] = position;

    // Prevent moves if game is over or it's not the player's turn
    if (
      boardState.win ||
      boardState.boardPositions[row][col] !== null ||
      isBotThinking
    ) {
      return;
    }

    // Play move sound (optional)
    if (moveAudio) {
      try {
        await moveAudio.play();
      } catch (err) {}
    }

    // Update the board with the player's move
    const newBoardPositions = boardState.boardPositions.map(
      (boardRow, rowIndex) =>
        boardRow.map((cell, colIndex) => {
          if (rowIndex === row && colIndex === col) return boardState.turn;
          return cell;
        })
    );

    // Check if the player won
    const win = check_win(newBoardPositions);
    if (win) {
      if (win.winner == "draw") {
        setTieScore(tieScore + 1);
      } else if (win.winner == boardState.bot) {
        console.log("tes");
        setBotScore(botScore + 1);
      } else {
        setPlayerScore(playerScore + 1);
      }
      setBoardState({
        ...boardState,
        boardPositions: newBoardPositions,
        win,
      });
      return;
    }

    setBoardState({
      ...boardState,
      boardPositions: newBoardPositions,
      turn: boardState.turn == "x" ? "o" : "x",
    });
  }
  //for bot
  useEffect(() => {
    if (boardState.turn == boardState.bot) {
      setIsBotThinking(true);
      sleep(250).then(() => {
        const botMove = playBotMove(
          boardState.boardPositions,
          boardState.bot,
          difficulty || "hard"
        );
        if (botMove) {
          setPosition([botMove.row, botMove.col]);
        }
        setIsBotThinking(false);
      });
    }
  }, [boardState]);

  return {
    setPosition,
    resetBoardPositions,
    playerScore,
    botScore,
    tieScore,
    player,
    ...boardState,
  };
}
