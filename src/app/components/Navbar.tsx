// "use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" href="/">Biswajit Panday</Link>
        <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/projects">Projects</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
