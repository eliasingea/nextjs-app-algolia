import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-between align-center p-6 min-h-[100vh]">
      <div className="text-sm w-[100%] z-10 font-mono">
        <Link href="/plp/Drama">
          <h2>PLP - Drama</h2>
        </Link>
        <Link href="/plp/Comedy">
          <h2>PLP - Comedy</h2>
        </Link>
        <Link href="/plp/context-Adventure">
          <h2>Adventure Page - Context Rule</h2>
        </Link>
      </div>
    </main>
  );
}
