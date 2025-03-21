"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

const links = [
  { name: "home", path: "/" },
  { name: "career", path: "/career" },
  { name: "portfolio", path: "/portfolio" },
  { name: "skills", path: "/skills" },
  { name: "contact", path: "/contact" },
];

const MobileNav = () => {
  const pathName = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <CiMenuFries className="text-2xl text-secondary-default cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center text-center">
        <div className="mt-20 mb-10">
          <Link href={"/"}>
            <h1 className="text-4xl font-semibold">
              Panday<span className="text-secondary-default">.</span>
            </h1>
          </Link>
        </div>
        <nav className="flex flex-col gap-6 w-full">
          {links.map((link, index) => {
            const isActive = pathName === link.path || pathName.startsWith(link.path + "/");
            return (
              <Link
                key={index}
                href={link.path}
                className={`text-xl capitalize transition-all px-4 py-2 w-full text-center ${
                  isActive ? "text-secondary-default border-secondary-default" : "hover:text-secondary-default"
                }`}
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
