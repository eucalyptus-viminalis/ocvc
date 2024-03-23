import Link from "next/link";
import Login from "./Login";

export default function Home() {
  // const checks = getData()
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-9xl">OCVC*</h1>
        <h1 className="text-5xl">Latest Checks</h1>
        <Login/>
        <Link href={'generate'}>Generate</Link>
    </main>
  );
}
