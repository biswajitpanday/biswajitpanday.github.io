"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "career", path: "/career" },
  { name: "portfolio", path: "/portfolio" },
  { name: "resume", path: "/resume" },
  { name: "certifications", path: "/certifications" },
  { name: "contact", path: "/contact" },
];

const Nav = () => {
  const pathName = usePathname();
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path == pathName &&
              "text-secondary-default border-b-2 border-secondary-default"
            } capitalize font-medium hover:text-secondary-default transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
