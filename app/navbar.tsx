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
import Logo from "./assets/logo.svg";

export default function Navbar() {
  return (
    <div className="p-5 md:p-10 flex items-center justify-between">
      <div>
        <Image className="md:max-w-56 max-w-40" src={Logo} alt="tiktaktao" />
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
