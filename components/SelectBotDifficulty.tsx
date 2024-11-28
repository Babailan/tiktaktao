"use client";
import { useLocalStorage } from "usehooks-ts";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function SelectBotDifficulty() {
  const [difficulty, setDifficulty] = useLocalStorage<
    "easy" | "medium" | "hard"
  >("difficulty", "easy");

  return (
    <ToggleGroup type="single" value={difficulty}>
      <ToggleGroupItem
        value="easy"
        onClick={() => {
          setDifficulty("easy");
        }}
      >
        Easy
      </ToggleGroupItem>
      <ToggleGroupItem
        value="medium"
        onClick={() => {
          setDifficulty("medium");
        }}
      >
        Medium
      </ToggleGroupItem>
      <ToggleGroupItem
        value="hard"
        onClick={() => {
          setDifficulty("hard");
        }}
      >
        Hard
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
