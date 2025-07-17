import { Link } from "react-router-dom";
import { Icons } from "../Icons";
import { siteConfig } from "@/User/config/site";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-700 bg-[#071435] text-white">
      <div className="container mx-auto grid grid-cols-1 gap-30 px-6 py-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Branding + Description */}
        <div>
          <h3 className="mb-3 text-xl font-bold">
            Seamless Ticketing,
            <br />
            Memorable Moments..
          </h3>
          <p className="text-sm text-gray-300">
            "Ready to find your next great event? We offers a simple, secure,
            and speedy way to get your tickets. Dive into a world of
            entertainment and book your next adventure with ease."
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="mb-3 text-lg font-semibold">Contact Us</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">📞 +95 09 123 456 678</li>
            <li className="flex items-center gap-2">📧 ETS@gmail.com</li>
            <li className="flex items-center gap-2">📍 Yangon, Myanmar</li>
          </ul>
        </div>

        {/* Menu Links */}
        <div>
          <h4 className="mb-3 text-lg font-semibold">Menu</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            {siteConfig.mainNav.menu.map((item) => (
              <li key={item.title}>
                <Link to={item.href || "#"} className="hover:text-white">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="mb-3 text-lg font-semibold">Follow Us</h4>
          <div className="flex gap-4">
            <Link to="https://instagram.com">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                alt="Instagram"
                className="h-8 w-8 rounded-full"
              />
            </Link>
            <Link to="https://facebook.com">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                className="h-8 w-8 rounded-full"
              />
            </Link>
            <Link to="https://x.com">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3670/3670151.png"
                alt="X"
                className="h-8 w-8 rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
