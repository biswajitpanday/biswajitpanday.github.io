"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "home", path: "/" },
  { name: "career", path: "/career" },
  { name: "portfolio", path: "/portfolio" },
  { name: "skills", path: "/skills" },
  { name: "contact", path: "/contact" },
];

const Nav = () => {
  const pathName = usePathname();
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        const isActive = pathName === link.path || pathName.startsWith(link.path + "/");
        return (
          <Link
            href={link.path}
            key={index}
            className={`capitalize font-medium transition-all ${
              isActive ? "text-secondary-default border-secondary-default" : "border-transparent hover:text-secondary-default"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
