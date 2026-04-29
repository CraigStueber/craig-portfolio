import Link from "next/link";
import Nav from "./Nav";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          craig stueber
        </Link>
        <Nav />
      </div>
    </header>
  );
}
