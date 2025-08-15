'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `py-1 px-30 text-lg font-light rounded-2xl transition duration-300 ${
      pathname === path
        ? "text-sky-300 bg-slate-700"
        : "text-white hover:text-sky-300 hover:bg-slate-700"
    }`;

  return (
    <nav className="bg-slate-800 shadow-lg flex items-center justify-start py-3 px-10 fixed top-0 left-0 w-full">
      <div className="flex items-center gap-5">
        <Link href="/" className={linkClass("/")}>
          Machine
        </Link>

        <Link href="/graphe" className={linkClass("/graphe")}>
          Graph
        </Link>
      </div>
    </nav>
  );
}
