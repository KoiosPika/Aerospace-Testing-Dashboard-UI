import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <h1 className="text-xl font-bold">Aerospace Dashboard</h1>
      <div>
        <Link className="mx-2" href="/">Home</Link>
        <Link className="mx-2" href="/data">Test Data</Link>
      </div>
    </nav>
  );
}