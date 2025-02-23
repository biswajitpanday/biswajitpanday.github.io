"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

const links = [
  { name: "home", path: "/" },
  { name: "career", path: "/career" },
  // { name: "services", path: "/services" },
  { name: "portfolio", path: "/portfolio" },
  // { name: "skills", path: "/skills" },
  // { name: "resume", path: "/resume" },
  // { name: "certifications", path: "/certifications" },
  { name: "contact", path: "/contact" },
];

const MobileNav = () => {
  const pathName = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <CiMenuFries className="text-[32] text-secondary-default" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href={"/"}>
            <h1 className="text-4xl font-semibold">
              Panday<span className="text-secondary-default">.</span>
            </h1>
          </Link>
        </div>
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            return (
              <Link
                key={index}
                href={link.path}
                className={`${
                  link.path === pathName &&
                  "text-secondary-default border-b-2 border-secondary-default"
                } text-xl capitalize hover:text-secondary-default transition-all`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
