"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/types";
import styles from "./Header.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.sectionId}
          href={`/${item.href}`}
          className={styles.navLink}
        >
          {item.label}
        </Link>
      ))}
      <Link href="/role-fit" className={styles.navLinkAccent}>
        role fit
      </Link>
    </nav>
  );
}
