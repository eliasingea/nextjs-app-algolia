import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href="/plp/Drama">
          <h2>PLP - Appliances</h2>
        </Link>
        <i>
          after beeing redirected, refresh page to make sure it has been SSR
          rendered
        </i>
      </div>
    </main>
  );
}
