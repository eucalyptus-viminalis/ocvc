import Link from "next/link";
import Login from "./Login";

export default function Home() {
  // const checks = getData()
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 text-xl">
        <h1 className="text-9xl">OCVC*</h1>
        <h1 className="text-5xl">Latest Checks</h1>
        <Login/>
        <Link className="text-5xl border hover:opacity-80 p-4" href={'generate'}>Start!</Link>
    </main>
  );
}
