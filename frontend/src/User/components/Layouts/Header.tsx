import { siteConfig } from "@/User/config/site";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  return (
    <header className="bg-background fixed top-0 z-50 w-full border-b">
      <nav className="container mx-auto flex h-16 items-center">
        <MainNavigation items={siteConfig.mainNav.menu} />
        <MobileNavigation items={siteConfig.mainNav.menu} />
      </nav>
    </header>
  );
};

export default Header;
