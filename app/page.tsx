import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="my-10">
      <div className="gap-2 flex w-fit m-auto flex-col">
        <header className="text-lg font-bold">"Pick Your Game Mode."</header>
        <Link href={"/play/with_computer"}>
          <Button size="lg" className="w-full">
            <Play />
            Play with Computer
          </Button>
        </Link>
        <Link href={"/play/pass_play"}>
          <Button size="lg" variant="outline" className="w-full">
            <Users />
            Pass and Play
          </Button>
        </Link>
      </div>
    </div>
  );
}
