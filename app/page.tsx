"use client";

import { BoardNoSSR } from "@/components/board";
import { useBoard } from "@/hooks/useBoard";

export default function Page() {
  const board = useBoard({ player: "x" });
  return <BoardNoSSR {...board} />;
}
