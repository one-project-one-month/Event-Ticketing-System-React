import { Link } from "react-router-dom";
import { Icons } from "../Icons";
import { siteConfig } from "@/User/config/site";

export default function Footer() {
  return (
    <footer className="ml-4 w-full border-t lg:ml-0">
      <div className="container mx-auto pt-6 pb-8 lg:py-6">
        <section className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-20">
          <section className="ml-5">
            <Link to="/" className="flex items-center space-x-2">
              <Icons.logo className="size-7" aria-hidden="true" />
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </section>
          <section className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-4">
            {siteConfig.footerNav.map((footer) => (
              <div className="space-y-3" key={footer.title}>
                <h4 className="font-medium">{footer.title}</h4>
                <ul>
                  {footer.items.map((item) => (
                    <li className="py-2" key={footer.title}>
                      <Link
                        to={String(item.href)}
                        target={item.external ? "_blank" : undefined}
                        className="text-muted-foreground hover:text-foreground text-sm"
                      >
                        {item.title}
                      </Link>
                      <span className="sr-only">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section></section>
        </section>
      </div>
    </footer>
  );
}
