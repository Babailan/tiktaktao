"use client";
import { BoardPositions, useBoard } from "@/hooks/useBoard";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Circle, User, X } from "lucide-react";
import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Cell({
  value,
  row,
  col,
  setPosition,
}: {
  value: number | string;
  row: number;
  col: number;
  setPosition: (position: [number, number]) => void;
}) {
  const isEmpty = value == 0;
  function rowConverter(n: number) {
    if (n == 0) {
      return "a";
    }
    if (n == 1) {
      return "b";
    }
    return "c";
  }
  return (
    <AspectRatio
      ratio={1 / 1}
      className="flex items-center justify-center border border-neutral-400 cursor-pointer p-6 relative"
      onClick={() => setPosition([row, col])}
    >
      {isEmpty ||
        (value == "x" ? (
          <motion.div
            className="h-full w-full"
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.25 }}
          >
            <X stroke="#049267" className="h-full w-full" />
          </motion.div>
        ) : (
          <motion.div
            className="h-full w-full"
            animate={{ scale: 1 }}
            initial={{ scale: 0.25 }}
          >
            <Circle stroke="#A6CF00" className="h-full w-full animate-in" />
          </motion.div>
        ))}
      <span className="absolute left-1 bottom-1 text-xs text-muted-foreground">
        {rowConverter(row) + "" + col}
      </span>
    </AspectRatio>
  );
}

export function Board({
  boardPositions,
  setPosition,
  turn,
  playBotMove,
}: ReturnType<typeof useBoard>) {
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col max-w-96">
        <span>{`Current Turn: Player ${turn}`}</span>
        <div className="flex justify-between mb-2">
          <div className="flex justify-center">
            <User />
            Player 1
          </div>
          <div className="flex justify-center mr-2">
            <User />
            Player 2
          </div>
        </div>
        {boardPositions.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 text-6xl">
            {row.map((value, colIndex) => (
              <Cell
                key={colIndex}
                value={value}
                row={rowIndex}
                col={colIndex}
                setPosition={setPosition}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
        <Tabs defaultValue="account">
          <TabsList className="w-full">
            <TabsTrigger value="account" className="w-full">
              Moves
            </TabsTrigger>
            <TabsTrigger value="password" className="w-full">
              Info
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div>F</div>
            <div>F</div>
            <div>F</div>
            <div>F</div>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
