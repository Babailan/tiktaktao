"use client";

import { immediate_win } from "@/lib/helper/immediate_win";
import { col } from "motion/react-client";
import { useState } from "react";
import sleep from "sleep-promise";

export type BoardPositions = 0[][] | "x"[][] | "o"[][];

/**
 * @description Disable the ssr if you wanna use this because i usd Audio API which is not on ssr ;).
 * @returns returns the states of board :3.
 */

type config = {
  enable_bot: boolean;
  player: "x" | "o";
};

export function useBoard({ enable_bot, player }: config) {
  const moveAudio =
    typeof window === "undefined" ? undefined : new Audio("/audio/move.mp3");
  const bot = player == "x" ? "o" : "x";
  const [isBotThinking, setIsBotThinking] = useState(false);
  // Initial States
  const [turn, setTurn] = useState<"x" | "o">("x");
  const [started, setStarted] = useState(false);
  const [win, setWin] = useState(false);
  const [boardPositions, setBoardPositions] = useState<BoardPositions>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [boardHistory, setBoardHistory] = useState<BoardPositions[] | null>([]);

  // Reset the board
  function resetBoardPositions() {
    setBoardPositions([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setWin(false);
    setStarted(false);
    setTurn("x");
    setBoardHistory([]);
  }

  // Check if the current player has won
  function checkWin(board: BoardPositions, currentTurn: "x" | "o") {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === currentTurn &&
        board[i][1] === currentTurn &&
        board[i][2] === currentTurn
      ) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === currentTurn &&
        board[1][i] === currentTurn &&
        board[2][i] === currentTurn
      ) {
        return true;
      }
    }

    // Check main diagonal
    if (
      board[0][0] === currentTurn &&
      board[1][1] === currentTurn &&
      board[2][2] === currentTurn
    ) {
      return true;
    }

    // Check anti-diagonal
    if (
      board[0][2] === currentTurn &&
      board[1][1] === currentTurn &&
      board[2][0] === currentTurn
    ) {
      return true;
    }

    return false;
  }

  async function setPosition(position: [number, number]) {
    if (isBotThinking || win) {
      return;
    }
    const [row, col] = position;

    // Ensure the position is empty before updating
    if (boardPositions[row][col] === 0) {
      let updatedBoard = boardPositions.map((r, rIndex) =>
        r.map((cell, cIndex) =>
          rIndex === row && cIndex === col ? turn : cell
        )
      ) as BoardPositions;

      // Update the board and toggle the turn
      setBoardPositions(updatedBoard);
      if (enable_bot && turn == player) {
        await playBotMove(updatedBoard);
      }
      setBoardPositions(updatedBoard);
      setTurn(turn === "x" ? "o" : "x");
      setStarted(true);
      setBoardHistory((prev) =>
        prev ? [...prev, updatedBoard] : [updatedBoard]
      );
      moveAudio?.play();

      // Check if the current move resulted in a win
      if (checkWin(updatedBoard, turn)) {
        setWin(true);
      }
    }
  }

  async function playBotMove(boardPositions: BoardPositions) {
    // immediate win
    const iw = immediate_win(boardPositions, bot);
    if (iw) {
      setIsBotThinking(true);
      await sleep(500);
      boardPositions[iw.row][iw.col] = bot;
    }
    setIsBotThinking(false);
    return boardPositions;
  }

  return {
    boardPositions,
    playBotMove,
    turn,
    setPosition,
    started,
    resetBoardPositions,
    win,
    boardHistory,
  };
}
