import { siteConfig } from "@/config/site";
import MainNavigation from "./MainNavigation";
// import MobileNavigation from "./MobileNavigation";

const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-green-200">
      <nav className="container mx-auto flex h-16 items-center">
        <MainNavigation items={siteConfig.mainNav} />
        {/* <MobileNavigation /> */}
      </nav>
    </header>
  );
};

export default Header;
