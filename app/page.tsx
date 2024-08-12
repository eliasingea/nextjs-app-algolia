import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href="/plp/Drama">
          <h2>PLP - Drama</h2>
        </Link>
        <Link href="/plp/Comedy">
          <h2>PLP - Comedy</h2>
        </Link>
        <Link href="/plp/Adventure">
          <h2>PLP - Adventure</h2>
        </Link>
      </div>
    </main>
  );
}
