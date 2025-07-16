import { siteConfig } from "@/config/site";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const bgClass = isHome && !scrolled ? "bg-transparent" : "bg-background";

  return (
    <header
      className={`${bgClass} fixed top-0 z-50 w-full border-b transition-colors duration-300`}
    >
      <nav className="container mx-auto flex h-16 items-center">
        <MainNavigation items={siteConfig.mainNav.menu} />
        <MobileNavigation items={siteConfig.mainNav.menu} />
      </nav>
    </header>
  );
};

export default Header;
