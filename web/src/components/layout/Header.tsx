"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "./Nav";
import { NAV_ITEMS } from "@/types";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Close mobile menu if viewport expands past the hamburger breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            craig stueber
          </Link>

          {/* Desktop nav */}
          <Nav />

          {/* Hamburger button */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.sectionId}
            href={item.href}
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/role-fit"
          className={styles.mobileNavLinkAccent}
          onClick={closeMenu}
        >
          role fit
        </Link>
      </div>
    </>
  );
}
