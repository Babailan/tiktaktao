import { Github } from "lucide-react";
import pckjson from "../package.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export function Footer() {
  return (
    <div className="float-end w-full flex gap-5 flex-col my-10 ">
      <div className="text-center w-full">Game Version {pckjson.version}</div>
      <div className="flex justify-center">
        <Link href={pckjson.repository.url} target="_blank">
          <Button variant={"outline"}>
            <Github /> Repository
          </Button>
        </Link>
      </div>
    </div>
  );
}
