import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/User/components/ui/sheet";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ScrollArea } from "@/User/components/ui/scroll-area";
import { Button } from "../ui/button";
import { Icons } from "../Icons";
import { siteConfig } from "@/User/config/site";
import type { MainNavItem } from "@/types";
import { ModeToggle } from "../mode-toggle";
interface MainNavigationProps {
  items?: MainNavItem[];
}

export default function MobileNavigation({ items }: MainNavigationProps) {
  // Fix sheet does not close while changing layout
  const [isDesktop, setIsDesktop] = useState(false);
  const query = "(min-width: 1024px)";

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setIsDesktop(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    return () => result.removeEventListener("change", onChange);
  }, [query]);

  if (isDesktop) {
    return null;
  }

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="ml-4 size-7">
            <Icons.menu aria-hidden="true" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pt-9">
          <SheetClose asChild>
            <Link to="/" className="ml-4 flex items-center">
              <Icons.logo className="mr-2 size-4" />
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </SheetClose>
          <ScrollArea className="m-4 h-[calc(100vh-8rem)] pb-8">
            <div className="flex flex-col space-y-5 pl-2">
              {items?.map((item) => {
                const isQR = item.title === "Check QR";
                return (
                  <SheetClose asChild key={item.title}>
                    {isQR ? (
                      <button
                        type="button"
                        className="ml-4 flex items-center border-none bg-transparent p-0 text-left"
                        onClick={() => open()}
                      >
                        {item.title}
                      </button>
                    ) : (
                      <Link
                        to={String(item.href)}
                        className="ml-4 flex items-center"
                      >
                        {item.title}
                      </Link>
                    )}
                  </SheetClose>
                );
              })}
              <ModeToggle />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
