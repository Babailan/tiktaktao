"use client";

import { Board } from "@/components/board";
import { useBoard } from "@/hooks/useBoard";
import { Circle, X } from "lucide-react";
import dynamic from "next/dynamic";

export default function Page() {
  const board = useBoard({ enable_bot: true, player: "x" });
  return (
    <div>
      <Board {...board} />
      <div className="flex font-bold text-center items-center gap-2">
        {board.turn == "x" ? (
          <X stroke="#049267" className="size-10" />
        ) : (
          <Circle stroke="#A6CF00" className="size-10" />
        )}
      </div>
    </div>
  );
}
