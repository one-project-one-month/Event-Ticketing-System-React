import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/User/components/ui/navigation-menu";
import { ModeToggle } from "../mode-toggle";
import { useState } from "react";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import { Icons } from "../Icons";
import { siteConfig } from "@/User/config/site";
import type { MainNavItem } from "@/User/types";
import { cn } from "@/User/lib/utils";

interface MainNavigationProps {
  items?: MainNavItem[];
}

const MainNavigation = ({ items }: MainNavigationProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className={`hidden w-full items-center justify-between gap-6 lg:flex`}>
      <Link to="/" className="ml-5 flex items-center space-x-4">
        <Icons.logo className="size-7 text-white" aria-hidden="true" />
        <span className="inline-block text-2xl font-bold text-white">
          {siteConfig.name}
        </span>
        <span className="sr-only">Home</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="flex flex-row items-center justify-center gap-4">
          {items?.map((item) => {
            if (item.isSearch) {
              return (
                <NavigationMenuItem key="search">
                  {/* Search toggle button */}
                  <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-white transition-colors hover:bg-white/10",
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        className="size-4 text-white"
                        aria-hidden="true"
                      />
                    )}
                    <span className="sr-only">Search</span>
                  </button>
                  {isSearchOpen && (
                    <div className="bg-background absolute top-full right-4 mt-1 rounded-md border shadow-lg">
                      <div className="flex w-64 items-center px-4 py-2">
                        <Icons.search className="text-muted-foreground mr-2 size-5" />
                        <Input
                          type="search"
                          placeholder="Search events..."
                          className="border-0 shadow-none focus-visible:ring-0"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                        />
                      </div>
                    </div>
                  )}
                </NavigationMenuItem>
              );
            }

            return (
              <NavigationMenuItem key={item.title}>
                <Link to={String(item.href)} className="text-white">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.icon && (
                      <item.icon
                        className="mt-1.5 size-4 flex-shrink-0 text-white"
                        aria-hidden="true"
                      />
                    )}
                    <span>{item.title}</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="mr-5">
        <ModeToggle />
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={String(href)}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default MainNavigation;
