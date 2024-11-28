import Image from "next/image";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { SelectBotDifficulty } from "@/components/SelectBotDifficulty";

const minusLogoSize = 100;

export default function Navbar() {
  return (
    <div className="lg:p-10 flex items-center justify-between">
      <div>
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="tiktaktao"
            width={300 - minusLogoSize}
            height={120 - minusLogoSize}
          />
        </Link>
      </div>
      <div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="mb-10">
            <div className="flex flex-col justify-center items-center">
              <DrawerHeader>
                <DrawerTitle>Settings</DrawerTitle>
                <DrawerDescription>
                  You can change the depth of computer bot.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <SelectBotDifficulty />
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
