import { siteConfig } from "@/User/config/site";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";
import { cn } from "@/User/lib/utils";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={cn(
        "z-50 w-full",
        isHomePage ? "bg-transparent" : "bg-primary shadow-md",
      )}
    >
      <nav className="container mx-auto flex h-16 items-center">
        <MainNavigation items={siteConfig.mainNav.menu} />
        <MobileNavigation items={siteConfig.mainNav.menu} />
      </nav>
    </header>
  );
};

export default Header;
