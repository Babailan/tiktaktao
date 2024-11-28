"use client";
import { BoardPositions, useBoard, Winner } from "@/hooks/useBoard";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Circle, X } from "lucide-react";
import { motion, useAnimate, useInView } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import sleep from "sleep-promise";

export const BoardNoSSR = dynamic(() => import("../components/board"), {
  ssr: false,
});

function Cell({
  value,
  row,
  col,
  setPosition,
  win,
}: {
  value: BoardPositions[0][0];
  row: number;
  col: number;
  setPosition: (position: [number, number]) => void;
  win: Winner;
}) {
  const isEmpty = value == null;
  const winCell = win
    ? win?.indexes?.find((v) => v[0] == row && v[1] == col)
      ? "cell_win"
      : "opacity-50"
    : "";

  return (
    <AspectRatio
      ratio={1 / 1}
      className={`flex items-center justify-center cursor-pointer relative`}
      onClick={() => setPosition([row, col])}
    >
      {isEmpty ||
        (value == "x" ? (
          <motion.div
            className={`h-full w-full ${winCell}`}
            animate={{ scale: 0.9 }}
            initial={{ scale: 0.25 }}
          >
            <X className={"h-full w-full"} />
          </motion.div>
        ) : (
          <motion.div
            className={`h-full w-full ${winCell}`}
            animate={{ scale: 0.8 }}
            initial={{ scale: 0.25 }}
          >
            <Circle className="h-full w-full" />
          </motion.div>
        ))}
    </AspectRatio>
  );
}

export default function Board({
  boardPositions,
  setPosition,
  win,
  tieScore,
  bot,
  resetBoardPositions,
  botScore,
  playerScore,
  player,
}: ReturnType<typeof useBoard>) {
  const [scope, animate] = useAnimate();
  const [isResetting, setIsResetting] = useState(false);
  const inView = useInView(scope);
  useEffect(() => {
    if (inView && win) {
      if (win.winner == "draw") {
        const animateTie = animate(
          scope.current,
          { opacity: [1, 0.5, 1, 0.5, 1, 0.5, 1, 0.5, 1] },
          {
            duration: 1,
            ease: "linear",
            onComplete: () => {
              animateTie.cancel();
            },
            autoplay: false,
          }
        );
        animateTie.play();
      } else {
        const animateWinCell = animate(
          ".cell_win",
          { opacity: [1, 0.5, 1, 0.5, 1, 0.5, 1, 0.5, 1] },
          {
            duration: 1,
            ease: "linear",
            onComplete: () => {
              animateWinCell.cancel();
            },
            autoplay: false,
          }
        );
        animateWinCell.play();
      }
    }
  }, [inView, win, animate, scope]);

  function boardOnClick() {
    if (win) {
      setIsResetting(true);
      if (!isResetting) {
        sleep(250).then(() => {
          resetBoardPositions();
          setIsResetting(false);
        });
      }
    }
  }
  return (
    <div className="p-5 pb-20 rounded-3xl">
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-5 w-full m-auto max-w-[60vh]">
          <div
            className="w-full m-auto relative"
            ref={scope}
            onClick={boardOnClick}
          >
            <Image
              src={"/board.svg"}
              alt={"board lines"}
              fill={true}
              className={win ? "opacity-50" : ""}
            />
            {boardPositions.map((row, rowIndex) => (
              <div className="grid grid-cols-3 w-full" key={rowIndex}>
                {row.map((value, colIndex) => (
                  <Cell
                    key={`${colIndex}${rowIndex}`}
                    value={value}
                    row={rowIndex}
                    col={colIndex}
                    setPosition={setPosition}
                    win={win}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-between *:w-full flex-col md:flex-row w-full m-auto mb-2 text-xl">
            <div className="flex justify-center flex-col items-center gap-1">
              <span>Player ({player})</span>
              <span className="font-extrabold">{playerScore}</span>
            </div>
            <div className="flex justify-center flex-col items-center gap-1">
              <span>Tie</span>
              <span className="font-extrabold">{tieScore}</span>
            </div>
            <div className="flex justify-center flex-col items-center gap-1">
              <span>Computer ({bot})</span>
              <span className="font-extrabold">{botScore}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
